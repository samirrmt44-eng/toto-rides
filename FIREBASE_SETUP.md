# 🔥 Firebase Setup for TOTO (FREE)

## Step 1: Firebase Project बनाओ

1. जाओ: https://console.firebase.google.com
2. "Add Project" click करो
3. Project Name: `toto-rides`
4. Google Analytics: OFF (skip करो)
5. "Create Project" click करो

## Step 2: Web App add करो

1. Project Overview में → Web icon (</>) click करो
2. App name: `toto-web`
3. "Register App" click करो
4. एक code snippet मिलेगा — उसमें से `firebaseConfig` copy करो

## Step 3: Realtime Database बनाओ

1. Left menu → "Realtime Database"
2. "Create Database" click करो
3. Location: `asia-south1` (India) select करो
4. "Start in **test mode**" select करो (FREE)
5. "Enable" click करो

## Step 4: Database Rules set करो

Rules tab में यह paste करो:
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```
"Publish" click करो

## Step 5: Config दो

Firebase console से यह values copy करो:
- apiKey
- authDomain  
- databaseURL
- projectId

और mujhe बताओ — मैं code में add कर दूँगा!

---

## OR: Quick Test (Without Firebase)

अगर अभी Firebase नहीं बनाना तो:
- Same browser में 2 tabs खोलो
- Driver tab में register + online करो
- Customer tab में refresh करो
- ✅ Driver दिखेगा!