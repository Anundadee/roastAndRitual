import A from '../../assets/images/ethiopian-yirgacheffe.jpg'
import B from '../../assets/images/sumatra.jpg'
import C from '../../assets/images/colombia.jpg'
import D from '../../assets/images/espresso.jpg'
import E from '../../assets/images/decaf.jpg'
import F from '../../assets/images/geisha.jpg'
import G from '../../assets/images/nairobi.jpg'
import H from '../../assets/images/westlands.jpg'
import I from '../../assets/images/mombasa.jpg'
import J from '../../assets/images/nakuru.jpg'




export const PRODUCTS = [
  { id: 1, img: A, bg: "linear-gradient(135deg,#3d2010,#6b3a1f)", name: "Ethiopian Yirgacheffe", origin: "Ethiopia · Light Roast", desc: "Bright floral notes with a jasmine finish. Berry undertones and a clean, tea-like body.", price: 1850 },
  { id: 2, img: B, bg: "linear-gradient(135deg,#2d1b0e,#5c3317)", name: "Sumatra Mandheling", origin: "Indonesia · Dark Roast", desc: "Full-bodied with earthy complexity, dark chocolate, and a lingering smoky finish.", price: 1600 },
  { id: 3, img: C, bg: "linear-gradient(135deg,#4a2a10,#8a5230)", name: "Colombian Huila", origin: "Colombia · Medium Roast", desc: "Classic caramel sweetness balanced with bright acidity and a velvety mouthfeel.", price: 1550.00 },
  { id: 4, img: D, bg: "linear-gradient(135deg,#1a0e07,#3d2010)", name: "Espresso Ritual Blend", origin: "Multi-Origin · Dark Roast", desc: "Our signature house blend. Rich crema, notes of dark toffee and bittersweet chocolate.", price: 1400 },
  { id: 5, img: E, bg: "linear-gradient(135deg,#2d4a1a,#5c7a30)", name: "Decaf Swiss Water", origin: "Brazil · Medium Roast", desc: "Naturally decaffeinated. Smooth hazelnut and milk chocolate flavors without compromise.", price: 1700 },
  { id: 6, img: F, bg: "linear-gradient(135deg,#4a3010,#8a6030)", name: "Panama Geisha Reserve", origin: "Panama · Light Roast", desc: "Rare and exquisite. Bergamot, stone fruit, and honey — the pinnacle of specialty coffee.", price: 3200 },
];

export const LOCATIONS = [
  { img: G, bg: "linear-gradient(135deg,#1a0e07,#3d2010)", city: "Nairobi CBD", badge: "Flagship", address: "12 Kimathi Street, Nairobi CBD", hours: "Mon–Fri 6:30am–8pm · Sat–Sun 7am–9pm", details: "Our flagship store in the heart of Nairobi. Multi-level space with a full brew bar and roastery view." },
  { img: H, bg: "linear-gradient(135deg,#1a2e0e,#3d5c1a)", city: "Westlands", badge: "Branch", address: "Delta Corner Towers, Westlands", hours: "Mon–Sun 7am–9pm", details: "Tucked beside lush gardens. Perfect for weekend mornings with pour-over coffee and pastries." },
  { img: I, bg: "linear-gradient(135deg,#0e1a2e,#1a3d5c)", city: "Mombasa Old Town", badge: "Branch", address: "Ndia Kuu Road, Old Town Mombasa", hours: "Mon–Sun 6am–8pm", details: "A coastal sanctuary. Swahili-inspired interiors meet specialty coffee with an ocean breeze." },
  { img: J, bg: "linear-gradient(135deg,#2e1a0e,#5c3d1a)", city: "Nakuru Lake View", badge: "Branch", address: "Kenyatta Avenue, Nakuru", hours: "Mon–Sat 7am–7pm · Sun 8am–6pm", details: "Named after the flamingo-flecked lake nearby. Serene rooftop seating with views to remember." },
];