/**
 * BridgeCode & AulaPlay — Presentation Controller v3
 * Navigation + Lightbox + Counter animation
 */
document.addEventListener('DOMContentLoaded', () => {
  const TOTAL = 9
  let current = 1

  const slides = document.querySelectorAll('.slide')
  const progressFill = document.getElementById('progressFill')
  const prevBtn = document.getElementById('prevBtn')
  const nextBtn = document.getElementById('nextBtn')
  const navDots = document.getElementById('navDots')
  const curNum = document.getElementById('curNum')
  const totalNum = document.getElementById('totalNum')
  const lightbox = document.getElementById('lightbox')
  const lbImg = document.getElementById('lbImg')
  const lbCaption = document.getElementById('lbCaption')
  const lbClose = document.getElementById('lbClose')
  const lbBackdrop = document.getElementById('lbBackdrop')

  totalNum.textContent = String(TOTAL).padStart(2, '0')

  // ── Generate nav dots ──────────────────────────────────────────
  for (let i = 1; i <= TOTAL; i++) {
    const dot = document.createElement('button')
    dot.className = i === 1 ? 'nav-dot active' : 'nav-dot'
    dot.dataset.index = String(i)
    dot.title = `Diapositiva ${i}`
    dot.addEventListener('click', () => goTo(i))
    navDots.appendChild(dot)
  }

  // ── Metric counter animation ───────────────────────────────────
  const runCounters = () => {
    for (const el of document.querySelectorAll('.metric-num')) {
      const target = Number.parseInt(el.dataset.target ?? '0', 10)
      const prefix = el.dataset.prefix ?? ''
      const suffix = el.dataset.suffix ?? ''
      let val = 0
      const steps = 60
      const inc = target / steps
      const timer = setInterval(() => {
        val += inc
        if (val >= target) {
          el.textContent = `${prefix}${target}${suffix}`
          clearInterval(timer)
        } else {
          el.textContent = `${prefix}${Math.round(val)}${suffix}`
        }
      }, 18)
    }
  }

  // ── Navigate ───────────────────────────────────────────────────
  const goTo = (index) => {
    if (index < 1 || index > TOTAL) return
    current = index

    for (const slide of slides) {
      const idx = Number.parseInt(slide.dataset.index ?? '0', 10)
      slide.classList.toggle('active', idx === current)
    }

    progressFill.style.width = `${(current / TOTAL) * 100}%`
    curNum.textContent = String(current).padStart(2, '0')

    for (const dot of navDots.querySelectorAll('.nav-dot')) {
      const idx = Number.parseInt(dot.dataset.index ?? '0', 10)
      dot.classList.toggle('active', idx === current)
    }

    if (current === 7) setTimeout(runCounters, 250)
  }

  prevBtn.addEventListener('click', () => goTo(current - 1))
  nextBtn.addEventListener('click', () => goTo(current + 1))

  // ── Keyboard ───────────────────────────────────────────────────
  document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('open')) {
      if (e.key === 'Escape') closeLightbox()
      return
    }
    switch (e.key) {
      case 'ArrowRight':
      case 'PageDown':
      case ' ':
        e.preventDefault()
        goTo(current + 1)
        break
      case 'ArrowLeft':
      case 'PageUp':
        e.preventDefault()
        goTo(current - 1)
        break
      case 'f':
      case 'F':
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {})
        } else {
          document.exitFullscreen?.()
        }
        break
      case 'Escape':
        document.exitFullscreen?.()
        break
    }
    const num = Number.parseInt(e.key, 10)
    if (num >= 1 && num <= 9) goTo(num)
  })

  // ── Touch swipe ────────────────────────────────────────────────
  let startX = 0
  document.addEventListener(
    'touchstart',
    (e) => {
      startX = e.changedTouches[0].screenX
    },
    { passive: true }
  )
  document.addEventListener(
    'touchend',
    (e) => {
      const delta = e.changedTouches[0].screenX - startX
      if (delta < -50) goTo(current + 1)
      else if (delta > 50) goTo(current - 1)
    },
    { passive: true }
  )

  // ── Lightbox ───────────────────────────────────────────────────
  const openLightbox = (src, caption) => {
    lbImg.src = src
    lbImg.alt = caption
    lbCaption.textContent = caption
    lightbox.classList.add('open')
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    lightbox.classList.remove('open')
    document.body.style.overflow = ''
    lbImg.src = ''
  }

  for (const trigger of document.querySelectorAll('.lightbox-trigger')) {
    trigger.addEventListener('click', () => {
      let src = ''
      let caption = trigger.dataset.caption ?? ''
      if (trigger.tagName === 'IMG') {
        src = trigger.src
        if (!caption) caption = trigger.alt
      } else {
        // trigger is a container — find its first img
        const img = trigger.querySelector('img')
        src = img?.src ?? ''
        if (!caption && img) caption = img.alt
      }
      openLightbox(src, caption)
    })
  }

  lbClose.addEventListener('click', closeLightbox)
  lbBackdrop.addEventListener('click', closeLightbox)

  // ── Init ───────────────────────────────────────────────────────
  goTo(1)
})
