# Utiliser une image Python officielle comme base
FROM python:3.9-slim

# Définir le répertoire de travail à l'intérieur du conteneur
WORKDIR /app

# Copier les fichiers de l'application vers le répertoire de travail du conteneur
COPY . /app

# Installer les dépendances à partir du fichier requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Exposer le port 5000 pour Flask
EXPOSE 5000

# Définir la commande par défaut pour exécuter l'application Flask
CMD ["python", "predict_diffusion.py"]