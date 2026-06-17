/* firebase-messaging-sw.js
   ----------------------------------------------------------------
   This file MUST be deployed at the ROOT of your site, i.e. it must be
   reachable at https://your-site/firebase-messaging-sw.js (same folder as
   index.html). It runs in the background so the app can receive push
   notifications even when the tab/app is closed.

   It uses the "compat" Firebase builds because service workers can't use
   ES module imports the same way the main page does.
   ---------------------------------------------------------------- */

importScripts("https://www.gstatic.com/firebasejs/12.14.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.14.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBV0PceaTmbBDS1RXXed67nry81wrnrnOA",
  authDomain: "hf-hpa-hub.firebaseapp.com",
  databaseURL: "https://hf-hpa-hub-default-rtdb.firebaseio.com",
  projectId: "hf-hpa-hub",
  storageBucket: "hf-hpa-hub.firebasestorage.app",
  messagingSenderId: "24804620954",
  appId: "1:24804620954:web:a31d9e25aced43f4aabd23"
});

const messaging = firebase.messaging();

/* Background messages → show a system notification. */
messaging.onBackgroundMessage(function(payload){
  const n = (payload && payload.notification) || {};
  const title = n.title || "HF-HPA Hub";
  const options = {
    body: n.body || "",
    icon: "/hf_logo.png",
    badge: "/hf_logo.png",
    data: (payload && payload.data) || {}
  };
  self.registration.showNotification(title, options);
});

/* Tapping a notification focuses (or opens) the app. */
self.addEventListener("notificationclick", function(event){
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(function(list){
      for (const c of list) { if ("focus" in c) return c.focus(); }
      if (clients.openWindow) return clients.openWindow("/");
    })
  );
});
