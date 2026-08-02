# TOTO Rides PRO - Full Advanced Version

## User ke Naye Demands - Sab Done ✅

### 1. Location Milte Hi Install Hide
- Jab GPS se location mil jayega (fromLL set), install banner auto hide ho jayega
- Code: `localStorage.setItem('totoLocationFound','true')` + `installBanner.style.display='none'`
- User bola: install app ka option hat jana chahiye jab location mil jaye - Done!

### 2. First Time Me Install Nazar Aaye
- Install banner sirf first time dikhega
- `localStorage.setItem('totoInstallShown','true')` - Dusri baar se nahi dikhega
- Agar user ne already install kar liya (display-mode standalone) to banner kabhi nahi dikhega
- Code me: check `localStorage.getItem('totoInstallShown')` + `locationFound` flag

### 3. Driver aur Customer Ke Liye Alag Alag Window + Alag Install
- **3 Manifest:**
  - `manifest.json` - Main hub (TOTO PRO)
  - `manifest-customer.json` - Customer App (short_name: TOTO Customer, theme green)
  - `manifest-driver.json` - Driver App (short_name: TOTO Driver, theme orange)
- **3 HTML:**
  - `index.html` - Hub - 2 bade cards: Customer Open + Driver Open, alag install buttons (Customer Install / Driver Install)
  - `customer.html` - Sirf customer, no approval needed, voice input, easy booking
  - `driver.html` - Sirf driver, approval needed, voice control
- **Alag Install:** Customer.html open karke Install karo to "TOTO Customer" naam se install hoga, Driver.html se "TOTO Driver" naam se - Alag alag icons, alag shortcuts

### 4. Approval System - Driver Ke Liye
- **Customer:** Koi approval nahi - Sabhi jud sakte hain
- **Driver:** Approval jaruri - Flow:
  1. Driver registration form: Name, Phone, Vehicle, Number, Photo, City
  2. Data save: `localStorage ttoDriver_{phone}` + `totoPendingDrivers` array + Firebase `toto_drivers/{phone}` with `approved:false, status:'pending'` + `toto_pending_approvals/{phone}`
  3. Pending Screen: "Approval Pending - Admin ko bolo"
  4. Admin Approval: `admin.html` me Drivers > Pending list me Approve button - Click karne par `approved:true, approvedBy: 'Main Admin'`
  5. Ya Approvers list: Main admin kisi bhi phone ko Approver bana sakta hai - `totoApprovers` array + Firebase `toto_approvers/{phone}` - Wo bhi approve kar sakta hai
  6. Approval ke baad polling: Driver app har 4 sec me Firebase check karta hai - Approved hote hi Dashboard khul jayega
  7. Only Approved Driver hi Online ja sakta hai aur bookings dekh sakta hai

- **Approval Kaun Kar Sakta Hai?**
  - Main Admin: Aap (admin/admin123 se admin.html login)
  - Ya jise aapne Approver banaya hai (driver.html > Approvers section me phone add karo)

### 5. Driver Friendly + Voice Command
- **Customer Voice:**
  - 🎤 Mic button Pickup/Drop ke paas - Bolo "Ramgarh se Ranchi jana hai" - Auto fill + Map pe location
  - Geocoding: Nominatim OpenStreetMap se lat/lng nikalta hai
  - Commands: "Book", "GPS", "Location"
- **Driver Voice:**
  - Top bar me Voice bar: Bolo "Go Online", "Offline", "Accept", "Reject", "Photo lo"
  - Driver registration me: Name, Phone field me mic - Bolo naam
  - Bookings: Bolo "Accept" se booking accept

## Short Domain Guide
- 4EVERLAND: Project Settings > Name = `toto` -> domain `toto-xxxx.ipfs.4everland.app` (chota)
- Custom: Domains > Add Custom Domain > `totoride.in` (Rs 300/year Hostinger) -> CNAME add
- Short Link: tinyurl.com se `tinyurl.com/toto-ramgarh`
- File SHORT-DOMAIN.txt me full guide

## Files:
- index.html - Hub + 2 app cards + install first time + location hide
- customer.html - Customer only - No approval - Voice
- driver.html - Driver only - Approval + Voice + Approvers management
- manifest.json, manifest-customer.json, manifest-driver.json - Alag alag install
- sw.js - Caches all 3 apps
- admin.html - Admin panel + Pending approvals approve kar sakte ho
- icon-192.png, icon-512.png

## How to Deploy to Web3 (Fleek / 4EVERLAND):
Same as before - GitHub repo me upload -> 4EVERLAND auto deploy -> Same IPFS link update
- Customer App direct link: `?/customer.html?city=ramgarh`
- Driver App direct link: `?/driver.html?city=ramgarh`

## Testing:
1. Customer: customer.html open -> City auto -> Map tap -> Book
2. Driver: driver.html open -> Register -> Pending screen -> Dusre browser me admin.html open -> admin/admin123 login -> Drivers > Pending me Approve karo -> Driver app me polling se Approved ho jayega -> Online jao

## Earning:
- Local ads (ads.json) + Driver commission + Customer booking fee
