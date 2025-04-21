import { useEffect } from 'react'
import gsap from 'gsap'

export function useAnimation(component) {
  useEffect(() => {
    switch(component) {
      case 'form':
        gsap.from('form', { duration: 0.5, y: 50, opacity: 0, ease: 'power2.out' })
        gsap.to('form', { duration: 0.5, y: 0, opacity: 1, ease: 'power2.out' })
        break
      case 'dashboard':
        gsap.from('.Dashboard', { 
          duration: 0.5, y: 50, opacity: 0, ease: 'power2.out'
        })
        gsap.to('.Dashboard', { 
         duration: 0.5, y: 0, opacity: 1, ease: 'power2.out'
        })
        break
      case 'crud':
        gsap.from('table tr', {
          duration: 0.4,
          x: -20,
          opacity: 0,
          stagger: 0.1,
          ease: 'power1.out'
        })
        gsap.to('table tr', {
          duration: 0.4,
          x: 0,
          opacity: 1,
          ease: 'power1.out'
        })
        break
      default:
        gsap.from('h1, h2, h3', { 
          duration: 0.5, 
          y: -20, 
          opacity: 0, 
        })
        gsap.to('h1,h2,h3', { 
          duration: 0.5, 
          y: 0, 
          opacity: 1, 
          ease: 'power2.out' 
        })
    }
  }, [component])
}