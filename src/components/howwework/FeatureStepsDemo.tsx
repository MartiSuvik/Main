import { FeatureSteps } from "../ui/feature-section"

const features = [
  { 
    step: 'Step 1', 
    title: 'Discover Your Style',
    content: 'Share your vision with our expert designers, and we’ll craft a personalized plan that blends elegance with functionality.', 
    image: 'https://www.visionnaire-home.com/sites/default/files/styles/side_by_side/public/stories/images/2014.jpg?itok=nO2YS8_4' 
  },
  { 
    step: 'Step 2',
    title: 'Precision in Execution',
    content: 'We source the finest materials and manage every detail, ensuring a seamless, stress-free process from concept to completion.',
    image: 'https://www.visionnaire-home.com/sites/default/files/styles/hero_image/public/hero-images/Visionnaire_Craftsmanship_01.jpg'
  },
  { 
    step: 'Step 3',
    title: 'Live in Luxury',
    content: 'Experience a home designed for lasting beauty, comfort, and sophistication—tailored exclusively to you.',
    image: 'https://catalogue.visionnaire-home.com/sites/default/files/styles/max_2600x2600/public/spaces/featured/Beloved2017_bedroom_01.jpg?itok=1caoiCiw&_gl=1*11htufj*_up*MQ..*_ga*NjI3NDIwNjgwLjE3NDA2ODg1ODY.*_ga_4D36DB6FV2*MTc0MDY4ODU4Ni4xLjEuMTc0MDY4OTI2My4wLjAuMA..'
  },
]

export function FeatureStepsDemo() {
  return (
    <FeatureSteps 
      features={features}
      title="COME WITH AN IDEA"
      autoPlayInterval={4000}
      imageHeight="h-[500px]"
    />
  )
}