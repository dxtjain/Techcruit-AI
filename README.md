# Techcruit AI - Intelligent Recruitment Platform

A modern, full-stack recruitment platform that leverages AI to analyze resumes, extract insights, and streamline the hiring process.

## 🚀 Features

### Dashboard
- Real-time statistics and analytics
- Skills distribution analysis
- Experience level breakdown
- Recent uploads tracking

### Batch Processing
- Upload multiple resumes simultaneously
- Progress tracking with real-time updates
- Processing history with detailed logs
- Support for PDF and DOCX formats

### AI Analysis
- Advanced resume parsing and analysis
- Skills extraction and scoring
- Experience level determination
- Detailed recommendations and insights
- Resume comparison capabilities

### Pricing
- Flexible pricing plans for different needs
- Add-on services for enhanced functionality
- Free trial available
- Professional enterprise solutions

## 🛠️ Tech Stack

**Frontend:**
- React 18 with TypeScript
- Vite for fast development
- Tailwind CSS for styling
- shadcn/ui component library
- React Router for navigation

**Backend:**
- Python Flask
- Groq AI for resume analysis
- PyMuPDF for PDF processing
- OpenPyXL for Excel operations
- CORS support for API access

## 📦 Installation

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd techcruit-ai
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Set up environment variables:
```bash
# Create a .env file with your Groq API key
GROQ_API_KEY=your_groq_api_key_here
```

4. Start the Flask server:
```bash
python main.py
```

The backend will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd "ui ux"
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:8080`

## 🚀 Deployment

### Vercel Deployment

1. Build the React application:
```bash
cd "ui ux"
npm run build
```

2. Install Vercel CLI:
```bash
npm install -g vercel
```

3. Deploy to Vercel:
```bash
vercel
```

### Environment Variables for Production

Make sure to set the following environment variables in your deployment:
- `GROQ_API_KEY`: Your Groq AI API key
- `FLASK_ENV`: Set to `production`

## 📁 Project Structure

```
techcruit-ai/
├── main.py                 # Flask backend server
├── google_sheet.py         # Google Sheets integration
├── requirements.txt        # Python dependencies
├── uploads/               # File upload directory
├── data/                  # Data storage
├── static/               # Static files
├── templates/            # Flask templates
└── ui ux/                # React frontend
    ├── src/
    │   ├── components/   # React components
    │   ├── pages/        # Page components
    │   ├── hooks/        # Custom hooks
    │   └── lib/          # Utilities
    ├── public/           # Public assets
    └── package.json      # Node dependencies
```

## 🔧 API Endpoints

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

### Batch Processing
- `POST /api/batch/process` - Process uploaded files
- `GET /api/batch/history` - Get processing history

### AI Analysis
- `POST /api/ai/analyze` - Analyze single resume
- `POST /api/ai/compare` - Compare multiple resumes

### Pricing
- `GET /api/pricing/plans` - Get pricing plans
- `POST /api/pricing/calculate` - Calculate custom pricing
- `POST /api/pricing/contact` - Submit contact form

## 🔑 Key Features

1. **AI-Powered Analysis**: Uses Groq AI for intelligent resume parsing
2. **Real-time Processing**: Live updates during batch processing
3. **Modern UI**: Clean, responsive design with Tailwind CSS
4. **Type Safety**: Full TypeScript implementation
5. **Professional Design**: Built with shadcn/ui components
6. **Scalable Architecture**: Modular component structure

## 📧 Contact

For support or inquiries, contact us at:
- Support: support@techcruitai.com
- Business: info@techmarqx.com

## 📄 License

This project is proprietary software. All rights reserved.

---

Built with ❤️ by the Techcruit AI team 