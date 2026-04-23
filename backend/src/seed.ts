import mongoose from 'mongoose'
import { connectDB } from './config/db'
import { registerUser } from './services/userService'
import { UserModel, UserRole } from './models/User'
import { PostModel } from './models/Posts'

// ─── helpers ────────────────────────────────────────────────────────────────

/** Returns a Date set to the given YYYY-MM-DD string */
const d = (iso: string) => new Date(iso)

// ─── seed data ──────────────────────────────────────────────────────────────

const POSTS = [
  // ── 2025-05
  {
    title: 'Floral Summer Dress',
    description: 'Light chiffon dress with an elegant floral print, perfect for warm days.',
    imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80',
    price: 89,
    likes: 142,
    shared: 38,
    bought: 24,
    createdAt: d('2025-05-03'),
  },
  {
    title: 'Classic White Linen Shirt',
    description: 'Relaxed fit linen shirt for effortless summer styling.',
    imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80',
    price: 65,
    likes: 87,
    shared: 21,
    bought: 15,
    createdAt: d('2025-05-18'),
  },

  // ── 2025-06
  {
    title: 'High-Waist Wide-Leg Trousers',
    description: 'Tailored wide-leg trousers that combine comfort with a bold silhouette.',
    imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80',
    price: 120,
    likes: 213,
    shared: 67,
    bought: 41,
    createdAt: d('2025-06-07'),
  },
  {
    title: 'Oversized Knit Cardigan',
    description: 'Cosy oversized cardigan in neutral beige, a wardrobe staple.',
    imageUrl: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80',
    price: 95,
    likes: 176,
    shared: 44,
    bought: 29,
    createdAt: d('2025-06-22'),
  },

  // ── 2025-07
  {
    title: 'Structured Blazer — Camel',
    description: 'Single-breasted camel blazer with sharp shoulders and a slim cut.',
    imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80',
    price: 220,
    likes: 305,
    shared: 89,
    bought: 53,
    createdAt: d('2025-07-11'),
  },
  {
    title: 'Slip Midi Skirt — Champagne',
    description: 'Silky satin slip skirt with a bias cut and delicate lace trim.',
    imageUrl: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&q=80',
    price: 78,
    likes: 134,
    shared: 31,
    bought: 19,
    createdAt: d('2025-07-28'),
  },

  // ── 2025-08
  {
    title: 'Leather Biker Jacket',
    description: 'Genuine leather moto jacket with asymmetric zip — a timeless statement piece.',
    imageUrl: 'https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=600&q=80',
    price: 349,
    likes: 412,
    shared: 115,
    bought: 72,
    createdAt: d('2025-08-05'),
  },
  {
    title: 'Cropped Denim Jacket',
    description: 'Vintage-wash cropped denim jacket, distressed for a casual edge.',
    imageUrl: 'https://images.unsplash.com/photo-1527942631879-6a6f1af59e7e?w=600&q=80',
    price: 110,
    likes: 198,
    shared: 52,
    bought: 34,
    createdAt: d('2025-08-19'),
  },
  {
    title: 'Printed Wrap Blouse',
    description: 'Abstract-print wrap blouse with ruffled neckline and flutter sleeves.',
    imageUrl: 'https://images.unsplash.com/photo-1485518882345-15568b007407?w=600&q=80',
    price: 57,
    likes: 93,
    shared: 26,
    bought: 18,
    createdAt: d('2025-08-30'),
  },

  // ── 2025-09
  {
    title: 'Wool Blend Coat — Charcoal',
    description: 'Double-breasted wool-blend coat with a belted waist and oversized lapels.',
    imageUrl: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&q=80',
    price: 295,
    likes: 378,
    shared: 99,
    bought: 61,
    createdAt: d('2025-09-08'),
  },
  {
    title: 'Ribbed Turtleneck Sweater',
    description: 'Fine-knit ribbed turtleneck in cream — essential for transitional dressing.',
    imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80',
    price: 82,
    likes: 156,
    shared: 43,
    bought: 27,
    createdAt: d('2025-09-25'),
  },

  // ── 2025-10
  {
    title: 'Faux-Fur Trim Puffer',
    description: 'Lightweight puffer jacket with detachable faux-fur hood — warmth meets style.',
    imageUrl: 'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=600&q=80',
    price: 175,
    likes: 267,
    shared: 73,
    bought: 48,
    createdAt: d('2025-10-04'),
  },
  {
    title: 'Pleated Midi Skirt — Forest Green',
    description: 'Chiffon pleated skirt in a rich forest green, floaty and elegant.',
    imageUrl: 'https://images.unsplash.com/photo-1562137369-1a1a0bc5cec4?w=600&q=80',
    price: 68,
    likes: 119,
    shared: 35,
    bought: 22,
    createdAt: d('2025-10-21'),
  },

  // ── 2025-11
  {
    title: 'Chunky-Knit Beanie',
    description: 'Handcrafted chunky-knit beanie in merino wool — cosy and on-trend.',
    imageUrl: 'https://images.unsplash.com/photo-1510598155069-b4f2d5c3d8e4?w=600&q=80',
    price: 35,
    likes: 74,
    shared: 18,
    bought: 42,
    createdAt: d('2025-11-09'),
  },
  {
    title: 'Velvet Blazer — Burgundy',
    description: 'Rich burgundy velvet blazer — perfect for festive occasions.',
    imageUrl: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=80',
    price: 245,
    likes: 329,
    shared: 88,
    bought: 57,
    createdAt: d('2025-11-20'),
  },
  {
    title: 'Cable-Knit Oversized Jumper',
    description: 'Chunky cable-knit jumper in oatmeal, relaxed fit for layering.',
    imageUrl: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=600&q=80',
    price: 115,
    likes: 187,
    shared: 51,
    bought: 36,
    createdAt: d('2025-11-30'),
  },

  // ── 2025-12
  {
    title: 'Sequin Party Dress',
    description: 'All-over gold sequin mini dress — steal the spotlight at any party.',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80',
    price: 158,
    likes: 487,
    shared: 134,
    bought: 96,
    createdAt: d('2025-12-02'),
  },
  {
    title: 'Tartan Wool Scarf',
    description: 'Oversized tartan scarf woven from pure lambswool, cosy and classic.',
    imageUrl: 'https://images.unsplash.com/photo-1487956382158-bb926046304a?w=600&q=80',
    price: 49,
    likes: 102,
    shared: 29,
    bought: 63,
    createdAt: d('2025-12-18'),
  },

  // ── 2026-01
  {
    title: 'Tailored Straight-Leg Jeans',
    description: 'Mid-rise straight-leg jeans in indigo wash — the modern alternative to skinny.',
    imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80',
    price: 135,
    likes: 231,
    shared: 61,
    bought: 44,
    createdAt: d('2026-01-10'),
  },
  {
    title: 'Silk Camisole — Ivory',
    description: 'Pure silk camisole with lace trim — luxurious layering piece or standalone top.',
    imageUrl: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80',
    price: 92,
    likes: 163,
    shared: 47,
    bought: 31,
    createdAt: d('2026-01-27'),
  },

  // ── 2026-02
  {
    title: 'Bomber Jacket — Sage Green',
    description: 'Satin bomber jacket in sage green with contrast ribbing — relaxed cool.',
    imageUrl: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&q=80',
    price: 145,
    likes: 274,
    shared: 72,
    bought: 49,
    createdAt: d('2026-02-08'),
  },
  {
    title: 'Boucle Cropped Jacket',
    description: 'Chanel-inspired boucle cropped jacket with gold-tone buttons.',
    imageUrl: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80',
    price: 268,
    likes: 351,
    shared: 94,
    bought: 58,
    createdAt: d('2026-02-22'),
  },

  // ── 2026-03
  {
    title: 'Trench Coat — Classic Beige',
    description: 'Iconic double-breasted trench coat with storm flap and D-ring belt.',
    imageUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80',
    price: 315,
    likes: 394,
    shared: 107,
    bought: 68,
    createdAt: d('2026-03-05'),
  },
  {
    title: 'Pastel Knit Co-ord Set',
    description: 'Matching cropped cardigan and wide-leg trousers in soft lavender.',
    imageUrl: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600&q=80',
    price: 175,
    likes: 289,
    shared: 78,
    bought: 52,
    createdAt: d('2026-03-19'),
  },

  // ── 2026-04
  {
    title: 'Linen Wide-Leg Suit',
    description: 'Two-piece linen suit in pale sky blue — effortless spring dressing.',
    imageUrl: 'https://images.unsplash.com/photo-1600950207944-0d63e8edbc3f?w=600&q=80',
    price: 210,
    likes: 318,
    shared: 83,
    bought: 46,
    createdAt: d('2026-04-02'),
  },
  {
    title: 'Asymmetric Ruffle Blouse',
    description: 'Off-shoulder blouse with an asymmetric ruffle hem in crisp white cotton.',
    imageUrl: 'https://images.unsplash.com/photo-1485518882345-15568b007407?w=600&q=80',
    price: 72,
    likes: 145,
    shared: 39,
    bought: 28,
    createdAt: d('2026-04-14'),
  },
]

// ─── main ────────────────────────────────────────────────────────────────────

const seed = async () => {
  try {
    await connectDB()
    console.log('Connected to database')

    // ── Users ──────────────────────────────────────────────────────────────

    try {
      const admin = await registerUser({
        email: 'admin@fashion.com',
        password: 'admin123',
        name: 'Admin User',
        role: UserRole.ADMIN,
      })
      console.log('✓ Admin user created:', admin)
    } catch {
      console.log('⚠ Admin user already exists — skipping')
    }

    try {
      const customer = await registerUser({
        email: 'customer@fashion.com',
        password: 'customer123',
        name: 'Customer User',
        role: UserRole.CUSTOMER,
      })
      console.log('✓ Customer user created:', customer)
    } catch {
      console.log('⚠ Customer user already exists — skipping')
    }

    // ── Posts ──────────────────────────────────────────────────────────────

    const existingCount = await PostModel.countDocuments()
    if (existingCount > 0) {
      console.log(`\n⚠ ${existingCount} posts already exist — skipping post seed`)
      console.log('  (drop the posts collection first if you want to re-seed)')
    } else {
      // Fetch admin's _id to use as userId on every post
      const adminDoc = await UserModel.findOne({ email: 'admin@fashion.com' })
      if (!adminDoc) throw new Error('Admin user not found after creation')

      const userId = adminDoc._id

      // insertMany at the driver level so we can supply custom createdAt values
      const docs = POSTS.map(p => ({
        _id: new mongoose.Types.ObjectId(),
        title: p.title,
        description: p.description,
        imageUrl: p.imageUrl,
        price: p.price,
        likes: p.likes,
        shared: p.shared,
        bought: p.bought,
        userId,
        createdAt: p.createdAt,
        updatedAt: p.createdAt,
      }))

      await PostModel.collection.insertMany(docs)
      console.log(`\n✓ ${docs.length} posts seeded across ${new Set(POSTS.map(p => p.createdAt.toISOString().slice(0, 7))).size} months`)

      // Print a quick price range summary
      const prices = POSTS.map(p => p.price)
      console.log(`  Price range: $${Math.min(...prices)} – $${Math.max(...prices)}`)
      console.log(`  Total likes: ${POSTS.reduce((s, p) => s + p.likes, 0).toLocaleString()}`)
    }

    console.log('\n─────────────────────────────────────────────')
    console.log('Default credentials')
    console.log('  Admin    → admin@fashion.com    / admin123')
    console.log('  Customer → customer@fashion.com / customer123')
    console.log('─────────────────────────────────────────────')

    process.exit(0)
  } catch (error) {
    console.error('Seed error:', error)
    process.exit(1)
  }
}

seed()
