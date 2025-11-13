# 💪 GymTracker Pro

A professional full-stack gym workout tracker application built with React and Node.js. Track your workouts, monitor progress, and achieve your fitness goals!

## Features

- **Workout Tracking**: Log your workouts with detailed exercise information
- **Exercise Library**: Browse a comprehensive database of exercises categorized by muscle group
- **Progress Dashboard**: Visualize your fitness journey with interactive charts and statistics
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **RESTful API**: Backend API for managing workouts, exercises, and progress data

## Tech Stack

### Frontend
- React 18
- React Router for navigation
- Axios for API calls
- Recharts for data visualization
- Modern CSS with responsive design

### Backend
- Node.js & Express
- RESTful API architecture
- In-memory data storage (easily expandable to MongoDB)
- CORS enabled

## Project Structure

```
gymtracker-pro/
├── client/                  # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── WorkoutList.js
│   │   │   ├── WorkoutForm.js
│   │   │   ├── ExerciseLibrary.js
│   │   │   └── ProgressDashboard.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
├── server/                  # Node.js backend
│   ├── models/
│   │   ├── Workout.js
│   │   └── Exercise.js
│   ├── routes/
│   │   ├── workouts.js
│   │   ├── exercises.js
│   │   └── progress.js
│   └── index.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup Instructions

1. **Clone or navigate to the project directory**
   ```bash
   cd gymtracker-pro
   ```

2. **Install all dependencies (both backend and frontend)**
   ```bash
   npm run install-all
   ```

3. **Create environment file**
   ```bash
   copy .env.example .env
   ```
   Edit `.env` and configure your settings (default values work for development)

4. **Start the application**

   **Option 1: Run both servers concurrently (recommended for development)**
   ```bash
   npm run dev
   ```

   **Option 2: Run servers separately**
   
   Terminal 1 - Backend:
   ```bash
   npm run server
   ```
   
   Terminal 2 - Frontend:
   ```bash
   npm run client
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## API Endpoints

### Workouts
- `GET /api/workouts` - Get all workouts
- `GET /api/workouts/:id` - Get single workout
- `POST /api/workouts` - Create new workout
- `PUT /api/workouts/:id` - Update workout
- `DELETE /api/workouts/:id` - Delete workout

### Exercises
- `GET /api/exercises` - Get all exercises
- `GET /api/exercises/:id` - Get single exercise
- `GET /api/exercises?category=chest` - Filter by category

### Progress
- `GET /api/progress` - Get progress data
- `POST /api/progress` - Add progress entry
- `GET /api/progress/stats` - Get statistics

## Usage

### Creating a Workout
1. Navigate to "New Workout" tab
2. Enter workout details (name, duration, notes)
3. Add exercises with sets, reps, and weight
4. Click "Save Workout"

### Viewing Workouts
1. Go to "Workouts" tab
2. Click "View Details" to see exercise breakdown
3. Delete workouts as needed

### Exercise Library
1. Navigate to "Exercises" tab
2. Browse or search exercises
3. Filter by muscle group category

### Progress Tracking
1. Go to "Progress" tab
2. View statistics and charts
3. Track workout trends over time

## Future Enhancements

- [ ] User authentication and authorization
- [ ] MongoDB integration for persistent storage
- [ ] Exercise templates and workout plans
- [ ] Personal records tracking
- [ ] Social features (share workouts)
- [ ] Mobile app (React Native)
- [ ] Export workout data
- [ ] Nutrition tracking
- [ ] Rest timer functionality

## Development

### Running Tests
```bash
npm test
```

### Building for Production
```bash
npm run build
```

The production build will be created in `client/build/`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Support

For issues, questions, or suggestions, please open an issue in the repository.

---

**Made with 💪 by fitness enthusiasts, for fitness enthusiasts**
