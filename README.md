# 🎓 CampusMart

**The Premium Campus Marketplace for Students**

CampusMart is a state-of-the-art, glassmorphic web application designed for university students to buy, sell, and trade items within their campus community. Built with a modern tech stack and a focus on premium UI/UX.

![CampusMart Hero](https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200)

---

## 🚀 Key Features

- **Premium Design**: Modern glassmorphic interface with fluid animations and a curated color palette.
- **Secure Authentication**: Robust JWT-based authentication system.
- **Dynamic Marketplace**: Browse, search, and filter listings by category.
- **User Dashboard**: Manage your listings, profile, and saved items.
- **Supabase Integration**: Real-time database and storage for listing images.
- **Responsive Layout**: Fully optimized for mobile, tablet, and desktop.

---

## 🛠️ Tech Stack

### **Frontend**
- **React 19** & **Vite**
- **Tailwind CSS 4.0** (Custom Premium Design System)
- **Lucide React** (Icons)
- **Axios** (API Interceptor)

### **Backend**
- **Java 17** & **Spring Boot 3.4**
- **Spring Security** (JWT & CSRF Protection)
- **Spring Data JPA**
- **PostgreSQL** (Hosted on Supabase)

---

## ⚙️ Setup Instructions

### **1. Clone the Repository**
```bash
git clone https://github.com/Basavarah1611/campusmart.git
cd campusmart
```

### **2. Environment Configuration**
Create a `.env` file in the root directory with the following variables:

```env
# Supabase Configuration
SUPABASE_PROJECT_ID=ilsrhtcxztpaedpfqbpv
SUPABASE_ACCESS_TOKEN=your_access_token

# Database Configuration
SPRING_DATASOURCE_URL=jdbc:postgresql://db.ilsrhtcxztpaedpfqbpv.supabase.co:6543/postgres?prepareThreshold=0
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=your_db_password

# App Configuration
APP_SUPABASE_URL=https://ilsrhtcxztpaedpfqbpv.supabase.co
APP_SUPABASE_KEY=your_anon_key
APP_JWT_SECRET=your_long_random_jwt_secret
```

### **3. Run the Backend**
```bash
cd campusmart-backend
mvn spring-boot:run
```
*Backend will be live at `http://localhost:8080`*

### **4. Run the Frontend**
```bash
cd campusmart-frontend
npm install
npm run dev
```
*Frontend will be live at `http://localhost:5173`*

---

## 📸 Screenshots

> [!NOTE]
> The UI features a premium glassmorphism effect with blurred backgrounds and floating cards.

| Login Page | Register Page | Home Dashboard |
| :--- | :--- | :--- |
| ![Login](https://via.placeholder.com/400x250) | ![Register](https://via.placeholder.com/400x250) | ![Home](https://via.placeholder.com/400x250) |

---

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License
This project is licensed under the MIT License.
