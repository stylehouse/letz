#!/usr/bin/env raku

my $thumbdir;
sub mk-thumb(IO::Path $dir, IO::Path $src, Bool :$force) {
    $thumbdir ||= mkdir("static/thumb");

    # just the path inside the /v
    my $relsrc = $src.relative($dir).IO;
    # into the thumbnail directory
    my $thumb-path = $thumbdir.child($relsrc.dirname);
    $thumb-path.mkdir unless $thumb-path.d;
    my $dst = $thumb-path.child($relsrc.basename);

    return False if $dst.IO.e && !$force;
    (shell "gm convert -auto-orient $src -thumbnail '400x400>' $dst") == 0;
}

multi files(IO::Path $f where *.f) { $f }
multi files(IO::Path $f where *.d) {
  my @ls = $f.IO.dir(
      test => { not .starts-with('thumb' | '.' ) }
     );
  @ls.map: { |files($_) }
}

multi MAIN($dir = "/v",
  Bool :$n,          #= dry run
  Bool :$v,          #= verbose
  Bool :$force,      #= force regenerate existing thumbnails
  Int  :$degree = 4, #= degree of parallelism
) {

  say "dry run!" if $n;
  &shell.wrap: -> |c { note c.raku if $n || $v; callsame unless $n }

  my atomicint $converted = 0;
  my atomicint $considered = 0;
  my $where = $dir.IO;
  files($where).race(:$degree).map: -> $f {
    with ++⚛$considered {
      note "$_ files considered" if $_ %% 100;
      exit if $_ > 100
    }
    ++⚛$converted if mk-thumb($where, $f, :$force);
  }

  say "converted $converted out of $considered";
}