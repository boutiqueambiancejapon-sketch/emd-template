import { HeroSection } from '@/components/home/HeroSection'
import { ArticleTicker } from '@/components/home/ArticleTicker'
import { DealsStrip } from '@/components/home/DealsStrip'
import { RecentArticles } from '@/components/home/RecentArticles'
import { CategorySection } from '@/components/home/CategorySection'
import { FeaturedTools } from '@/components/home/FeaturedTools'
import { AuthorTeaser } from '@/components/home/AuthorTeaser'
import { niche } from '@/niche.config'

export default function HomePage() {
  return (
    <main id="main-content">
      <HeroSection />
      <ArticleTicker />
      <DealsStrip />
      {/* Éditorial — derniers articles featured + grille */}
      <RecentArticles />
      {/* Sections par catégorie — dynamique depuis niche.config */}
      {niche.categories.map((cat, i) => (
        <CategorySection key={cat.slug} slug={cat.slug} label={cat.label} index={i} />
      ))}
      {/* Outils interactifs */}
      <FeaturedTools />
      <AuthorTeaser />
    </main>
  )
}
