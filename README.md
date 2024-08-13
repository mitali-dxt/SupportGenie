# SupportGenie

SupportGenie is a conversational AI chatbot built with Next.js and Firebase. It provides users with a seamless chat experience and includes features such as user authentication, feedback collection, and a user-friendly interface.

## Features

- **User Authentication:** Allows users to sign up and log in using Firebase Authentication.
  ![image](https://github.com/user-attachments/assets/50447501-517f-4260-b4da-201f636878c6)

- **Chat Interface:** Provides an interactive chat experience.
- ![image](https://github.com/user-attachments/assets/f878b757-40a3-4195-b6a5-eeb67f2cfeb4)

- **Feedback Collection:** Collects user feedback on their chat experience.
- ![image](https://github.com/user-attachments/assets/41184c5b-4fc8-46e4-b058-2ae4d2c45658)

- **Responsive Design:** Optimized for various screen sizes.

## Getting Started

### Prerequisites

- Node.js (recommended version: 16.x or higher)
- npm or Yarn (package managers)
- Firebase account for authentication and data storage

### Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

3. **Setup Environment Variables**

   Create a `.env.local` file in the root of your project and add your Firebase configuration and other environment variables:

   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   ```

4. **Run the Development Server**

   ```bash
   npm run dev
   ```

   or

   ```bash
   yarn dev
   ```

   Open your browser and navigate to `http://localhost:3000` to see your application in action.

### Contributing

Feel free to open issues or submit pull requests to contribute to the project. For larger changes, please discuss with us first.
