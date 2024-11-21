# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies
   First, install the necessary dependencies for your app:

   ```bash
   npm install
   ```
   
2. Start the app
   To launch the app, use the following command:

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can begin developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## APK Demo
You can download the APK file for a demo of the app:

- **APK download link**: [Demo APK](https://expo.dev/artifacts/eas/q3AFavma6eJNmDnoEjrigT.apk)

## Login Flow
The app will check if the device supports biometric authentication and proceed with the following priority:

1. **Face ID** (if available)
2. **Fingerprint** (if Face ID is not available but fingerprint is supported)
3. **Traditional login method**
   
**Login Credentials:**

- **Email**: test@example.com
- **Password**: password123
  
If biometrics are unavailable, the user might need to log in using the usual method.

## Get a fresh project

When you're ready to start fresh, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
