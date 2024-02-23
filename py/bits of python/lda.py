import numpy as np
# Set random seed for reproducibility
np.random.seed(42)

from sklearn.feature_extraction.text import CountVectorizer
from sklearn.decomposition import LatentDirichletAllocation



# Sample documents
with open('lda_input_text', 'r') as f:
    documents = f.readlines()

# < indent is stripped off here
documents = [doc.strip() for doc in documents]




# Initialize CountVectorizer
vectorizer = CountVectorizer(stop_words='english')

# Fit and transform the documents
X = vectorizer.fit_transform(documents)

# Train LDA model
lda_model = LatentDirichletAllocation(n_components=22, random_state=42)
lda_model.fit(X)

def space_out_weights(lighter, accumulator):
    while lighter > 1:
        lighter -= 1
        accumulator("\t")
# Print the most significant words for each topic
feature_names = vectorizer.get_feature_names_out()
for idx, topic in enumerate(lda_model.components_):
    string_parts = ["Topic {}: ".format(idx+1)]
    def stringup(s):
        string_parts.append(s)


    last_weight = 10
    for term_idx in topic.argsort()[:-11:-1]:
        weight = topic[term_idx]
        term = feature_names[term_idx]

        lighter = last_weight - weight
        if lighter > 1:
            if last_weight < 10 or True:
                space_out_weights(lighter, stringup)
            last_weight = weight
            # stringup("{:.3f}".format(weight))

        stringup(" {}".format(term))

    print(''.join(string_parts))

exit()


# Print the most significant words for each topic
for idx, topic in lda_model.print_topics():

    topic_terms = lda_model.get_topic_terms(idx, topn=10)
    for term_id, weight in topic_terms:
        term = dictionary.get(term_id)




