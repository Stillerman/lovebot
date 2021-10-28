for file in ../Step2/images/*
do
    echo $file
    gcloud ml vision detect-text $file | jq -r '.responses[0].fullTextAnnotation.text' >> connections.txt
done
node clean_connections.js
