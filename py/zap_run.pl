#!/usr/bin/env perl
use strict;
use warnings;

my $command = $ARGV[0];

# Ignore SIGINT (Ctrl+C)
$SIG{INT} = 'IGNORE';

# Run the command
my $process = system($command);

# Exit
exit($process);