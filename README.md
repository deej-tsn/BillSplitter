# BillSplitter

BillSplitter is a web application designed to simplify the process of dividing bills among friends. With features like receipt scanning, editable items and charges, and customizable user inputs, this tool ensures accurate cost allocation with ease.

---

## 🚀 Features

- **AI-Powered Receipt Scanning**: Uses Google Generative AI to parse receipts and automatically extract items, quantities, prices, and charges.
- **Editable Items and Charges**: Manually edit or add items and charges for full customization.
- **Dynamic User Management**: Add, edit, and remove users while dynamically splitting items or charges.
- **Multi-stage Setup Flow**:
  - **Stage 1**: Upload and process the receipt.
  - **Stage 2**: Edit items and charges.
  - **Stage 3**: Add users and allocate costs.
  - **Stage 4**: Review and finalize the bill split.
- **Responsive UI**: Optimized for both desktop and mobile devices.
- **Seamless State Management**: Powered by Redux for a consistent and efficient user experience.

---

## 🛠️ Technologies Used

- **React**: Frontend library for building user interfaces.
- **Redux Toolkit**: State management for efficient data flow.
- **TypeScript**: Static typing to ensure type safety and enhanced code quality.
- **Google Generative AI**: Integrates Google’s AI model for receipt scanning.
- **Vite**: Fast and modern frontend tooling for development and bundling.git 
- **ESLint & Prettier**: Linting and formatting for maintaining clean code.

---

## 📦 Installation

1. **Clone the repository**:
   ```sh
   git clone https://github.com/your-username/BillSplitter.git
   cd BillSplitter
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file at the root of the project and add the following:
   ```env
   VITE_GOOGLE_FLASH_API_KEY=your_google_flash_api_key
   ```

4. **Start the development server**:
   ```sh
   npm run dev
   ```

5. **Build for production**:
   ```sh
   npm run build
   ```

---

## 🔥 Usage

1. **Start the application**:
   ```
   npm run dev
   ```
2. **Open the browser** and navigate to:
   ```
   http://localhost:5173
   ```

### Workflow Overview:
- Upload a receipt image.
- AI parses the receipt into structured items and charges.
- Edit items and charges as needed.
- Add users to split the cost.
- Review and finalize the bill split.

---

## 📂 Project Structure

```plaintext
BillSplitter/
├── src/
│   ├── ai/                    # AI integration logic
│   ├── components/             # Reusable UI components
│   │   ├── actions/            # Actions like sending and splitting items
│   │   ├── items/              # Item components
│   │   ├── layout/             # Layout and structure components
│   │   ├── setup/              # Multi-stage setup flow components
│   │   └── users/              # User management components
│   ├── models/                 # TypeScript models and types
│   ├── store/                  # Redux state management
│   └── vite-env.d.ts           # Vite TypeScript environment
├── .env                        # Environment variables
├── index.html                  # Entry point
├── package.json                # Dependencies and scripts
└── vite.config.ts               # Vite configuration
```

---

## 🔑 Environment Variables

This project uses the following environment variables:
- `VITE_GOOGLE_FLASH_API_KEY`: API key for Google Generative AI.

Ensure you have this key set up in a `.env` file at the root of the project.

---

## 🤝 Contribution

Contributions are welcome! Follow these steps:

1. **Fork the repository**.
2. **Create a new branch**:
   ```sh
   git checkout -b feature/YourFeatureName
   ```
3. **Make your changes** and **commit** them:
   ```sh
   git commit -m 'Add new feature'
   ```
4. **Push to your branch**:
   ```sh
   git push origin feature/YourFeatureName
   ```
5. **Create a Pull Request** on the original repository.

---

## ✅ To-Do List

- [ ] Implement detailed unit tests for components.
- [ ] Improve error handling and user feedback.
- [ ] Optimize performance with memoization and `reselect`.
- [ ] Add more UI/UX enhancements for better accessibility.
- [ ] Refactor duplicated components for better maintainability.

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 💬 Feedback

If you encounter any issues or have suggestions, feel free to open an issue or submit a pull request.

Happy Coding! 🚀
