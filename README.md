# PathFinder: Interactive AI Pathfinding Algorithm Visualizer

<img width="1899" height="858" alt="Screenshot 2026-03-26 002423" src="https://github.com/user-attachments/assets/1710d89a-122c-4a8f-b2e4-aaf44a630e37" />

## 🎯 Project Overview

**PathFinder** is an interactive web-based application designed to bring search algorithms to life on dynamic grids. It provides a visual, step-by-step demonstration of how various AI pathfinding algorithms explore a space to find the optimal path from a starting point to a destination.

Whether you're learning about algorithm fundamentals, studying for technical interviews, or simply curious about how AI navigation works, PathFinder makes complex algorithms easy to understand through real-time visualization and intuitive controls.

## ✨ Features

### Core Functionality
- **Real-Time Algorithm Visualization:** Watch algorithms execute step-by-step with detailed visualization of visited nodes, frontier exploration, and the final path
- **Interactive Grid:** Draw custom walls and obstacles directly on the grid by clicking and dragging
- **Multiple Drawing Tools:** Wall, Erase, Start Point, and End Point placement tools
- **Adjustable Animation Speed:** Control visualization speed from slow (detailed observation) to fast (quick execution)
- **Random Maze Generation:** Instantly generate complex random mazes for algorithms to solve
- **Clear Grid:** Reset the grid to a blank state or return to the original empty configuration

### Real-Time Statistics
- **Step Counter:** Track progress through the algorithm execution
- **Node Counter:** View the total number of visited nodes during exploration
- **Path Length:** See the length of the final path found by the algorithm
- **Path Detection:** Immediate feedback on whether a valid path exists

### UI & User Experience
- **Dark, Modern Theme:** Eye-friendly dark interface with vibrant techno colors
- **Responsive Legend:** Color-coded legend showing what each grid color represents
- **Algorithm Information:** Detailed descriptions of each algorithm's approach and characteristics
- **Responsive Design:** Works seamlessly on different screen sizes

## 🧠 Implemented Algorithms

### Uninformed Search (Exhaustive)
- **BFS (Breadth-First Search):** Explores all directions evenly and guarantees the shortest path in unweighted grids
- **DFS (Depth-First Search):** Dives deep into one path before backtracking, not guaranteed to find the shortest path
- **Dijkstra (Uniform Cost Search):** Finds the shortest path by exploring nodes based on minimum distance

### Informed Search (Heuristic-Based)
- **A* Search:** Uses heuristics to efficiently find the shortest path toward the target with optimal performance
- **Greedy Best-First Search:** Chooses paths that appear closest to the goal but may not be optimal
- **Bidirectional Search:** Searches from both ends and meets in the middle for faster results

Each algorithm has unique characteristics affecting speed, optimality, and memory efficiency.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Local Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/anyakumar/AI-Path-Finder.git
   cd AI-Path-Finder
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Run the development server:**
   ```sh
   npm run dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

### Build for Production
```sh
npm run build
npm run preview
```

## 📖 How to Use

1. **Set Start & End Points:**
   - Select the "Start" tool and click on a grid cell
   - Select the "End" tool and click on another grid cell

2. **Draw Obstacles:**
   - Select "Wall" and click/drag to draw walls
   - Use "Erase" to remove walls

3. **Choose an Algorithm:**
   - Open the Algorithm dropdown on the left sidebar
   - Select any of the 6 implemented algorithms

4. **Adjust Speed:**
   - Use the Speed slider to control visualization speed

5. **Run Visualization:**
   - Click the "Visualize" button to execute the algorithm
   - Use Pause/Resume to control playback
   - Click "Skip to End" to jump to the final result

6. **Explore Options:**
   - Generate a random maze with obstacles
   - Clear the grid to start over

## 🛠️ Tech Stack

- **Frontend Framework:** React 18+ with TypeScript
- **Build Tool:** Vite (fast development and optimized builds)
- **Styling:** Tailwind CSS (utility-first CSS framework)
- **UI Components:** shadcn/ui (accessible, reusable component library)
- **Icons:** Lucide React
- **Testing:** Vitest
- **Linting:** ESLint

## 📁 Project Structure

```
src/
├── components/        # React components
│   ├── Grid.tsx      # Main grid visualization component
│   ├── NavLink.tsx   # Navigation component
│   └── ui/           # shadcn/ui components
├── lib/
│   ├── searchAlgorithms.ts  # Algorithm implementations
│   └── utils.ts      # Utility functions
├── pages/            # Page components
│   ├── Index.tsx     # Main visualizer page
│   └── NotFound.tsx  # 404 page
├── hooks/            # Custom React hooks
├── test/             # Test files
├── App.tsx           # App root component
└── main.tsx          # Entry point
```

## 🎨 Algorithm Visualization Colors

- **Green:** Start Node
- **Red:** End Node
- **Dark Gray:** Walls
- **Blue:** Visited Nodes
- **Purple:** Frontier (nodes being explored)
- **Yellow:** Final Path Found

## 💡 Key Concepts

### Pathfinding
The process of finding the optimal route between two points while avoiding obstacles.

### Heuristics
Estimated distances used by informed algorithms (like A*) to make smarter decisions about which nodes to explore next.

### Optimality
Whether an algorithm is guaranteed to find the shortest path. BFS and A* are optimal; Greedy is not.

### Completeness
Whether an algorithm will always find a path if one exists. All implemented algorithms are complete.

## 📝 Purpose & Learning

This project serves as an educational tool for:
- Understanding how different pathfinding algorithms work
- Comparing algorithm efficiency and path optimality
- Preparing for technical interviews
- Learning about algorithmic complexity and trade-offs
- Visualizing AI concepts in real-time

## 👥 Contributors

**Team Members:**
- Anya Kumar
- Soumya Bhatia
- M. Dharni

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs or suggest features
- Submit pull requests with improvements
- Improve documentation
- Optimize algorithm implementations

## 📮 Contact & Support

For questions, suggestions, or feedback about PathFinder, please open an issue on the GitHub repository.
