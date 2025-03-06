import { GridMotion } from "../ui/grid-motion";

export function GridMotionDemo() {
  const items = [
    // Images 1-4
    "https://www.visionnaire-home.com/sites/default/files/styles/product_gallery_teaser/public/box_text_bg_image/accessories.jpg?h=62c681c6&itok=X4979buy",
    "https://www.visionnaire-home.com/sites/default/files/styles/product_gallery_teaser/public/box_text_bg_image/wardrobes.jpg?h=62c681c6&itok=9VHYWLPP",
    "https://www.visionnaire-home.com/sites/default/files/styles/product_gallery_teaser/public/box_text_bg_image/07%20Audabe_1750.jpg?h=a9c9f155&itok=qBTzQxgc",
    "https://www.visionnaire-home.com/sites/default/files/styles/product_gallery_teaser/public/box_text_bg_image/consolle_0.jpg?h=201e2d68&itok=e1fvz8eI",
    // Quote 1
    "“Design Shapes The Future”",
    // Images 5-8
    "https://www.visionnaire-home.com/sites/default/files/styles/product_gallery_teaser/public/box_text_bg_image/Visionnaire_Duncan%20Wall_01.jpg?h=5eef411c&itok=fVXEXdlw",
    "https://www.visionnaire-home.com/sites/default/files/styles/product_gallery_teaser/public/box_text_bg_image/carpets.jpg?h=62c681c6&itok=ZZKdfPrK",
    "https://www.visionnaire-home.com/sites/default/files/styles/product_gallery_teaser/public/box_text_bg_image/bookshelves_0.jpg?h=0905083a&itok=8Nx2Ergg",
    "https://www.visionnaire-home.com/sites/default/files/styles/product_gallery_teaser/public/box_text_bg_image/lights.jpg?h=62c681c6&itok=RkEzzq5W",
    // Quote 2
    "Design and Designers move outside the traditional boundaries.",
    // Images 9-12
    "https://www.visionnaire-home.com/sites/default/files/styles/product_gallery_teaser/public/box_text_bg_image/wellness_0.jpg?h=437756d2&itok=rTMb1dlf",
    "https://www.visionnaire-home.com/sites/default/files/styles/product_gallery_teaser/public/box_text_bg_image/vanity.jpg?h=62c681c6&itok=GqVAm_fJ",
    "https://www.visionnaire-home.com/sites/default/files/styles/product_gallery_teaser/public/box_text_bg_image/desk.jpg?h=62c681c6&itok=D8cGUBte",
    "https://www.visionnaire-home.com/sites/default/files/styles/product_gallery_teaser/public/box_text_bg_image/art-gallery.jpg?h=62c681c6&itok=grzcQgp7",
    // Quote 3
    "Designers have the tacit permission to play outside the box.",
    // Images 13-16
    "https://www.visionnaire-home.com/sites/default/files/styles/product_gallery_teaser/public/box_text_bg_image/tables.jpg?h=eb6658bb&itok=rAscwNvz",
    "https://www.visionnaire-home.com/sites/default/files/styles/product_gallery_teaser/public/box_text_bg_image/Cabinets.jpg?h=201e2d68&itok=6S8WTrH9",
    "https://www.visionnaire-home.com/sites/default/files/styles/product_gallery_teaser/public/box_text_bg_image/Dehors.jpg?h=201e2d68&itok=AFKD9KOT",
    "https://www.visionnaire-home.com/sites/default/files/styles/product_gallery_teaser/public/box_text_bg_image/benches.jpg?h=eb6658bb&itok=3pVuFHhZ",
    // Image 17
    "https://www.visionnaire-home.com/sites/default/files/styles/product_gallery_teaser/public/box_text_bg_image/chaise-longues.jpg?h=d753e60c&itok=LlLbyZaM",
    // Quote 4
    "A good design acknowledges the past.",
    // Image 18
    "https://www.visionnaire-home.com/sites/default/files/styles/product_gallery_teaser/public/box_text_bg_image/bed.jpg?h=62c681c6&itok=RnbHuWEE",
    // Quote 5
    "A good design shapes uniqueness.",
    // Quote 6
    "A good design frames future."
  ];

  return (
    <div className="h-screen w-full bg-white font-serif">
      <GridMotion 
        items={items}
        gradientColor="#C0A960"
        className="relative z-10"
      />
    </div>
  );
}
