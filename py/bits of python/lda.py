from gensim import corpora, models
from gensim.parsing.preprocessing import preprocess_string
from gensim.parsing.preprocessing import remove_stopwords
from gensim.utils import simple_preprocess
import numpy as np

# Set random seed for reproducibility
np.random.seed(42)

# Sample documents
with open('lda_input_text', 'r') as f:
    documents = f.readlines()





# Define preprocessing function
def preprocess(doc):
    # Tokenize and preprocess document
    tokens = simple_preprocess(doc)
    # Remove stopwords and apply stemming
    tokens = [token for token in tokens if token not in remove_stopwords(doc)]
    return tokens

# Preprocess the documents
processed_docs = [preprocess(doc) for doc in documents]


# Create dictionary and corpus
dictionary = corpora.Dictionary(processed_docs)
corpus = [dictionary.doc2bow(doc) for doc in processed_docs]

# Train LDA model
lda_model = models.LdaModel(corpus, num_topics=12, id2word=dictionary)

def space_out_weights(lighter, accumulator):
    while lighter > 0.01:
        lighter -= 0.01
        accumulator("\t")

# Print the most significant words for each topic
for idx, topic in lda_model.print_topics():
    string_parts = ["Topic {}: ".format(idx+1)]
    def stringup(s):
        string_parts.append(s)

    topic_terms = lda_model.get_topic_terms(idx, topn=10)
    last_weight = 1
    for term_id, weight in topic_terms:
        term = dictionary.get(term_id)

        lighter = last_weight - weight
        if lighter > 0.01:
            if last_weight < 1:
                space_out_weights(lighter, stringup)
            last_weight = weight
            stringup("{:.3f}".format(weight))

        stringup(" {}".format(term))
    print(''.join(string_parts))


