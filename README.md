# 🌙 Drimmy - Journal de Rêves

Bienvenue dans **Drimmy**, une application mobile permettant de consigner, analyser et suivre ses rêves dans une interface claire et intuitive.  
Ce projet a été développé avec **React Native** (via **Expo**), et permet de :

- Enregistrer les rêves avec de nombreux détails
- Consulter une liste de tous les rêves
- Visualiser les détails d’un rêve
- Exporter les rêves en PDF (à venir)
- Recevoir des notifications de rappel
- Profiter d’une UI/UX propre avec animations et dark mode (optionnel)

---

## 🛠️ Tech Stack

- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
- [expo-router](https://expo.github.io/router/)

---

## 🚀 Lancer le projet

1. **Cloner le repo**

```bash
git clone https://github.com/ton-user/drimmy.git
cd drimmy
```

2. **Installer les dépendances**

```bash
npm install
```

3. **Lancer l’application**

```bash
npx expo start
```

Puis scanner le QR code avec l’application **Expo Go** ou utiliser un simulateur.

---

## 📸 Fonctionnalités principales

| Fonction                            | Description |
|-------------------------------------|-------------|
| 📝 Formulaire de rêve               | Saisie du rêve, émotions, tonalité, signification... |
| 📜 Liste des rêves                  | Affichage des rêves enregistrés |
| 🔎 Détails complets                 | Vue détaillée avec icônes et mise en page propre |
| 📩 Notification quotidienne (08h00) | Rappel d’écriture |
| 📤 Export PDF (à venir)             | Fonction d’export des rêves |
| 🌗 Mode sombre (à venir)            | Prise en charge via React Navigation |

---

## 📁 Structure du projet

```
drimmy/
├── app/
│   ├── (tabs)/                   # Onglets de navigation
│   ├── index.tsx                # Page du formulaire
│   ├── modal.tsx                # Page "à propos"
│   ├── editDream.tsx            # Modifier un rêve
│   └── four.tsx                 # Voir un rêve spécifique
├── components/
│   ├── DreamForm.tsx            # Formulaire complet
│   ├── DreamList.tsx            # Liste de tous les rêves
│   ├── DreamDetails.tsx         # Détails d'un rêve
│   └── SavedModal.tsx           # Fenêtre de confirmation
├── assets/                      # Fonts & images
└── README.md
```

---

## 🧑‍💻 Auteur

> Projet réalisé par **Saikorenji**

---

## ⚠️ Licence

Ce projet est sous licence **MIT**.  
Tu peux l'utiliser, le modifier et le partager comme tu veux ✌️

---

> 🛌 *"Note tes rêves, découvre ton inconscient."*  
> Drimmy, ton carnet de rêves numérique 🌙
