# Digital-Community-Platform

## Quest Search Implementation

### Tools Used

-  ```NLTK (Natural Language Toolkit)```  is a Python library for NLP tasks, offering access to numerous corpora and lexical resources like WordNet. It provides tools for text processing, including tokenization, stemming, tagging, parsing, and more. Used to analyze text data, extract information, and perform diverse NLP tasks.

-  ```TfidfVectorizer``` is a class in scikit-learn used to convert raw documents into a TF-IDF feature matrix. TF-IDF measures word importance relative to a document collection.

-  ```cosine_similarity``` is a function in scikit-learn that computes the cosine similarity between pairs of samples or documents, measuring similarity based on vector angles.


    > #### Mathematical Formula
    > The cosine similarity between two vectors $\mathbf{a}$ and $\mathbf{b}$ is computed using the dot product formula:
    > $$\text{cosine similarity}(\mathbf{a}, \mathbf{b}) = \frac{\mathbf{a} \cdot \mathbf{b}}{\|\mathbf{a}\| \|\mathbf{b}\|}$$ 
    >   where:
    >   - ${\mathbf{a} \cdot \mathbf{b}}$ represents the dot product of vectors $\mathbf{a}$  and $\mathbf{b}$ ,
    >   - ${\|\mathbf{a}\| \ and \ \|\mathbf{b}\|}$ denote the Euclidean norms of vectors $\mathbf{a}$ and $\mathbf{b}$, respectively.
    > #### Interpretation
    > The cosine similarity formula calculates the cosine of the angle between the two vectors, resulting in a value ranging from -1 to 1. Here's how to interpret the results:
    >- A cosine similarity value close to 1 indicates a high degree of similarity between the vectors.
    >- A cosine similarity value close to -1 suggests dissimilarity between the vectors.
    >- A cosine similarity value around 0 indicates no significant similarity or dissimilarity between the vectors.

-  ```Stopwords``` are common words (e.g., "and", "the", "is") often removed during text preprocessing as they carry minimal meaningful information. These words are available in multiple languages within NLTK's library for easy removal from text data.

-  ```PorterStemmer``` an NLTK algorithm, reduces words to their base form by removing affixes. While the resulting stem may not always be a valid word, this process aids in tasks like information retrieval and text analysis by simplifying words to their common base form.
    > #### Pseudo Algorithm
    >- Initialize a word buffer to store the input word.
    >- Apply a series of suffix removal rules to the word buffer until no further changes occur.
     >   - If the word matches a suffix pattern, remove the suffix.
     >   - Repeat this process for each applicable suffix rule.
    >- Apply additional transformations to handle special cases or exceptions.
    >- Return the resulting word buffer as the stemmed word.

### Search Execution Flow

```mermaid
graph TD
    F[Preprocess Quests] --> G[Vectorize Quest Descriptions]
    G --> H[Process User Query]
    H --> I[Calculate Cosine Similarity]
    I --> J[User Search Function]
    J --> K[Search Function Execution]
```

>- **TF-IDF Vectorizer Setup**:
   >    - ****Function****: `TfidfVectorizer`
   >    - ****Task****: Initializes the TF-IDF vectorizer with specified parameters.
>- **Preprocessing Quest Data**:
   >    - ****Function****: `preprocess`
   >    - ****Task****: Cleans, tokenizes, and stems the text data of each quest retrieved from the MongoDB collection.
>- **Vectorizing Quest Descriptions**:
   >    - ****Function****: `TfidfVectorizer.fit_transform`
   >    - ****Task****: Transforms the concatenated descriptions of processed quests into TF-IDF vectors.
>- **Processing User Query**:
   >    - ****Function****: `process_query`
   >    - ****Task****: Preprocesses the user's search query to make it compatible for cosine similarity calculation.
>- **Calculating Cosine Similarity**:
   >    - ****Function****: `cosine_similarity`
   >    - ****Task****: Computes the cosine similarity between the preprocessed user query vector and the TF-IDF vectors of the processed quests.
>- **User Search**:
   >    - ****Function****: `search`
   >    - ****Task****: Combines the preprocessing of the user query and the cosine similarity calculation to find and return relevant quests based on the user's search query.


## Quest Recommendations Based on User Profile

Upon logging into the quest page, users are promptly provided with quest recommendations tailored to their areas of specialization.

```mermaid

graph LR
    Start((Start)) --> Retrieve_User
    Retrieve_User --> Extract_Specializations
    Extract_Specializations --> Construct_Query
    Construct_Query --> Search_Quests
    Search_Quests --> End((End))

    subgraph Process
        Retrieve_User --> Extract_Specializations
        Extract_Specializations --> Construct_Query
        Construct_Query --> Search_Quests
        Search_Quests --> End
    end

    style Start fill:#4CAF50,stroke:#333,stroke-width:2px;
    style End fill:#4CAF50,stroke:#333,stroke-width:2px;

```
>- **Retrieving User Document**:
 >    - ****Function****: `get_user_document`
 >    - ****Task****: Retrieves the user document from the MongoDB collection based on the provided email identifier.
>- **Extracting Specializations**:
 >   - ****Function****: `extract_specializations`
 >   - ****Task****: Extracts the specializations from the retrieved user document, if available.
>- **Constructing Query from Specializations**:
 >   - ****Function****: `construct_query_from_specializations`
 >   - ****Task****: Constructs a query string using the extracted specializations to search for relevant quests.
>- **Searching for Relevant Quests**:
 >   - ****Function****: `search_quests_by_specializations`
 >   - ****Task****: Searches for quests related to the user's specializations using the constructed query string.
>- **Quest Suggestion**:    
 >   - ****Function****: `quest_suggestion`
 >   - ****Task****: Executes the entire process of retrieving user specializations, constructing a query, and searching for relevant quests, providing quest suggestions based on the user's profile.

## Installation Guide (Backend)

- Create a virtual environment

    ```
     python -m venv env 
     ```

- Activate the virtual environment

    ```
     env\Scripts\activate 
     ```

- Install the required packages

    ``` 
    pip install -r requirements.txt 
    ```

    Note - If error occurs upgrade the version of pip by running the following command

    ``` 
    python -m pip install -U pip 
    ```

- Run the following command to start the server

    ``` 
    uvicorn app.main:app --host localhost --port 8000 --reload
     ```

