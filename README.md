# BMI Calculator – How's Your Build?

A clean, responsive, and interactive **BMI (Body Mass Index) Calculator** built with **HTML, CSS, and JavaScript**. 
This project provides users with a quick way to estimate their BMI, visualize where they fall on the BMI scale, and receive additional health insights such as healthy weight range and estimated calorie requirements.

![HTML](https://img.shields.io/badge/HTML5-Markup-orange?logo=html5)
![CSS](https://img.shields.io/badge/CSS3-Styling-blue?logo=css3)
![JavaScript](https://img.shields.io/badge/JavaScript-Logic-yellow?logo=javascript)
![License](https://img.shields.io/badge/License-MIT-green)

---
## ✨ Features

- Calculate Body Mass Index (BMI)
- Supports **Metric** (kg/cm) and **Imperial** (lb/in) units
- Displays BMI category:
  - Underweight
  - Normal Weight
  - Overweight
  - Obese
- Interactive BMI gauge with animated indicator
- Calculates healthy weight range based on height
- Optional calorie estimation using the Mifflin-St Jeor equation
- Stores previous BMI calculations using Local Storage
- Shows BMI trend compared with previous measurements
- Copy result to clipboard
- Responsive design for desktop and mobile
- Elegant vintage-inspired UI

---

## 📷 Preview

<img width="500" alt="BMI Calculator Screenshot" src="images/screenshot.png">

> Replace the screenshot above with your own project screenshot if available.

---

## 🚀 Live Demo

You can view the live project here:

**https://body-iq.netlify.app/**

---

## 🛠 Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- Local Storage API

---

## 📂 Project Structure

```
BMI-Calculator/
│
├── index.html
├── README.md
└── images/
    └── screenshot.png
```

---

## ⚙️ How It Works

1. Enter your weight.
2. Enter your height.
3. (Optional) Enter your age and sex.
4. Click **Measure Me**.
5. The application will:

- Calculate your BMI
- Display your BMI category
- Show your healthy weight range
- Estimate your daily calorie needs (if age and sex are provided)
- Save the result locally for future comparison

---

## 📊 BMI Categories

| BMI | Category |
|------|----------|
| Below 18.5 | Underweight |
| 18.5 – 24.9 | Normal Weight |
| 25.0 – 29.9 | Overweight |
| 30.0 and above | Obese |

---

## 💾 Local Storage

The application stores your recent BMI measurements directly in your browser.

Stored information includes:

- Name
- BMI
- BMI Category
- Date of Measurement

No information is sent to any server.

---

## 📱 Responsive Design

The application is optimized for:

- Desktop
- Tablet
- Mobile devices

---

## Future Improvements

Some planned enhancements include:

- Dark mode
- Body Fat Percentage calculator
- Waist-to-Height Ratio
- Multiple user profiles
- Charts showing BMI history
- Export results as PDF
- Cloud synchronization

---

## Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/bmi-calculator.git
```

Navigate into the project folder:

```bash
cd bmi-calculator
```

Open the project:

```bash
index.html
```

Or use **Live Server** in Visual Studio Code.

---

## Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push your branch

```bash
git push origin feature-name
```

5. Open a Pull Request.

---

## License

This project is licensed under the MIT License.

---

## Author

Adedeji Jubril Abisade

AI Automation • Tech Enthusiast • AI Software Developer

GitHub: https://github.com/J25b

---

## Acknowledgements

- BMI classification based on World Health Organization (WHO) guidelines.
- Calorie estimation uses the Mifflin-St Jeor equation.
