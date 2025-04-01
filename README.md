# Job Portal - Hired

A comprehensive job portal application that connects job seekers with employers, providing a seamless platform for job searching, application management, and recruitment processes.

## 🚀 Features

### For Job Seekers
- **User Registration & Authentication**: Secure sign-up and login system
- **Profile Management**: Create and manage professional profiles
- **Job Search**: Advanced search and filtering options
- **Application Tracking**: Track application status and history
- **Resume Upload**: Upload and manage multiple resume versions
- **Job Alerts**: Get notified about relevant job opportunities

### For Employers
- **Company Profiles**: Create and manage company information
- **Job Posting**: Post and manage job listings
- **Candidate Management**: Review and manage applications
- **Search Candidates**: Find suitable candidates based on skills
- **Interview Scheduling**: Coordinate interviews with candidates

### General Features
- **Responsive Design**: Mobile-friendly interface
- **Real-time Notifications**: Instant updates on applications and messages
- **Secure Data Handling**: Privacy-focused data management
- **Advanced Filtering**: Smart search algorithms
- **Dashboard Analytics**: Insights and statistics

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB/MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer for resume/document handling
- **Email Service**: NodeMailer for notifications

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/saram-x/Job-Portal-Hired.git
   cd Job-Portal-Hired
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Create a `.env` file in the root directory
   - Add your environment variables (see `.env.example`)

4. **Database Setup**
   - Configure your database connection
   - Run database migrations if applicable

5. **Start the application**
   ```bash
   npm start
   ```

## ⚙️ Configuration

Create a `.env` file with the following variables:

```env
PORT=3000
DB_CONNECTION_STRING=your_database_url
JWT_SECRET=your_jwt_secret
EMAIL_SERVICE_API_KEY=your_email_api_key
UPLOAD_PATH=./uploads
```

## 🚀 Usage

1. **For Job Seekers:**
   - Register as a job seeker
   - Complete your profile with skills and experience
   - Browse and apply for jobs
   - Track your applications

2. **For Employers:**
   - Register as an employer
   - Create company profile
   - Post job listings
   - Manage applications and candidates

## 📱 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Jobs
- `GET /api/jobs` - Get all jobs
- `POST /api/jobs` - Create new job (employer)
- `GET /api/jobs/:id` - Get specific job
- `PUT /api/jobs/:id` - Update job (employer)
- `DELETE /api/jobs/:id` - Delete job (employer)

### Applications
- `POST /api/applications` - Apply for job
- `GET /api/applications` - Get user applications
- `PUT /api/applications/:id` - Update application status

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Developer**: Saram Khan
- GitHub: [@saram-x](https://github.com/saram-x)
- Email: your.email@example.com

## 🙏 Acknowledgments

- Thanks to all contributors who helped in developing this project
- Special thanks to the open-source community for amazing tools and libraries
- Inspiration from modern job portal platforms

---

**Made with ❤️ by Saram Khan**
