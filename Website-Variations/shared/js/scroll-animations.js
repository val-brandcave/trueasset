/**
 * Scroll Animation System - Vanilla JS
 * Replicates Framer Motion capabilities without framework dependencies
 * 
 * Features:
 * - Scroll-triggered animations
 * - Value interpolation (like useTransform)
 * - Easing functions
 * - IntersectionObserver integration
 * - Performance optimized (RAF + GPU transforms)
 * - Respects prefers-reduced-motion
 * - ADA compliant
 */

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Clamp a value between min and max
 */
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Interpolate a value from one range to another
 * @param {number} value - Current value
 * @param {Array} inputRange - [min, max] of input
 * @param {Array} outputRange - [min, max] of output
 * @param {string} easingName - Easing function name
 */
function interpolate(value, inputRange, outputRange, easingName = 'linear') {
  // Clamp value to input range
  const clampedValue = clamp(value, inputRange[0], inputRange[inputRange.length - 1]);
  
  // Find the segment we're in
  for (let i = 0; i < inputRange.length - 1; i++) {
    const inputStart = inputRange[i];
    const inputEnd = inputRange[i + 1];
    
    if (clampedValue >= inputStart && clampedValue <= inputEnd) {
      // Calculate progress within this segment (0-1)
      const segmentProgress = (clampedValue - inputStart) / (inputEnd - inputStart);
      
      // Apply easing
      const easedProgress = easing[easingName](segmentProgress);
      
      // Interpolate output value
      const outputStart = outputRange[i];
      const outputEnd = outputRange[i + 1];
      
      return outputStart + (outputEnd - outputStart) * easedProgress;
    }
  }
  
  return outputRange[outputRange.length - 1];
}

/**
 * Easing functions
 */
const easing = {
  linear: (t) => t,
  
  easeIn: (t) => t * t,
  easeOut: (t) => t * (2 - t),
  easeInOut: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  
  easeInCubic: (t) => t * t * t,
  easeOutCubic: (t) => (--t) * t * t + 1,
  easeInOutCubic: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  
  easeInQuart: (t) => t * t * t * t,
  easeOutQuart: (t) => 1 - (--t) * t * t * t,
  easeInOutQuart: (t) => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t,
  
  // Spring-like easing
  spring: (t) => {
    const c = 1.70158;
    return t * t * ((c + 1) * t - c);
  },
};

/**
 * Check if user prefers reduced motion
 */
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Apply GPU-optimized transform
 */
function applyTransform(element, transforms) {
  const {
    x = 0,
    y = 0,
    z = 0,
    scale = 1,
    scaleX = 1,
    scaleY = 1,
    rotate = 0,
    rotateX = 0,
    rotateY = 0,
    opacity = null
  } = transforms;
  
  let transformString = `translate3d(${x}px, ${y}px, ${z}px)`;
  
  if (scale !== 1) {
    transformString += ` scale(${scale})`;
  } else if (scaleX !== 1 || scaleY !== 1) {
    transformString += ` scale(${scaleX}, ${scaleY})`;
  }
  
  if (rotate !== 0) transformString += ` rotate(${rotate}deg)`;
  if (rotateX !== 0) transformString += ` rotateX(${rotateX}deg)`;
  if (rotateY !== 0) transformString += ` rotateY(${rotateY}deg)`;
  
  element.style.transform = transformString;
  
  if (opacity !== null) {
    element.style.opacity = opacity;
  }
}

// ============================================================================
// SCROLL PROGRESS TRACKER
// ============================================================================

class ScrollProgressTracker {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      start: options.start || 'start end',  // When element starts entering viewport
      end: options.end || 'end start',      // When element finishes leaving viewport
      ...options
    };
    
    this.progress = 0;
    this.callbacks = [];
    
    this.init();
  }
  
  init() {
    // Set up scroll listener
    this.updateProgress = this.updateProgress.bind(this);
    this.rafId = null;
    
    // Use passive listener for better performance
    window.addEventListener('scroll', () => {
      if (!this.rafId) {
        this.rafId = requestAnimationFrame(() => {
          this.updateProgress();
          this.rafId = null;
        });
      }
    }, { passive: true });
    
    // Initial calculation
    this.updateProgress();
  }
  
  updateProgress() {
    const rect = this.element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Parse start/end offsets
    const { start, end } = this.parseOffsets();
    
    // Calculate scroll progress (0 to 1)
    const startPoint = this.calculatePoint(start, rect, windowHeight);
    const endPoint = this.calculatePoint(end, rect, windowHeight);
    
    const scrollDistance = endPoint - startPoint;
    const currentScroll = -rect.top + windowHeight - startPoint;
    
    this.progress = clamp(currentScroll / scrollDistance, 0, 1);
    
    // Call registered callbacks
    this.callbacks.forEach(callback => callback(this.progress));
  }
  
  parseOffsets() {
    const parse = (offset) => {
      const parts = offset.split(' ');
      return {
        element: parts[0], // 'start', 'center', 'end'
        viewport: parts[1]  // 'start', 'center', 'end'
      };
    };
    
    return {
      start: parse(this.options.start),
      end: parse(this.options.end)
    };
  }
  
  calculatePoint(offset, rect, windowHeight) {
    // Element position
    let elementPos = 0;
    if (offset.element === 'start') elementPos = rect.top;
    else if (offset.element === 'center') elementPos = rect.top + rect.height / 2;
    else if (offset.element === 'end') elementPos = rect.top + rect.height;
    
    // Viewport position
    let viewportPos = 0;
    if (offset.viewport === 'start') viewportPos = 0;
    else if (offset.viewport === 'center') viewportPos = windowHeight / 2;
    else if (offset.viewport === 'end') viewportPos = windowHeight;
    
    return viewportPos;
  }
  
  onChange(callback) {
    this.callbacks.push(callback);
    callback(this.progress); // Call immediately with current value
  }
  
  destroy() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
    // Note: Can't remove the scroll listener without keeping a reference
    // In production, would need WeakMap tracking
  }
}

// ============================================================================
// SCROLL ANIMATION CONTROLLER
// ============================================================================

class ScrollAnimationController {
  constructor(element, config) {
    this.element = element;
    this.config = config;
    this.tracker = null;
    
    if (prefersReducedMotion() && !config.ignoreReducedMotion) {
      // Skip animations if user prefers reduced motion
      return;
    }
    
    this.init();
  }
  
  init() {
    const { scrollConfig = {}, animations = [] } = this.config;
    
    this.tracker = new ScrollProgressTracker(this.element, scrollConfig);
    
    this.tracker.onChange((progress) => {
      animations.forEach(animation => {
        this.applyAnimation(animation, progress);
      });
    });
  }
  
  applyAnimation(animation, progress) {
    const { target, property, inputRange, outputRange, easing: easingName = 'linear' } = animation;
    
    // Get target element
    const targetEl = typeof target === 'string' 
      ? document.querySelector(target) 
      : target || this.element;
    
    if (!targetEl) return;
    
    // Calculate value
    const value = interpolate(progress, inputRange, outputRange, easingName);
    
    // Apply based on property type
    if (['x', 'y', 'z', 'scale', 'scaleX', 'scaleY', 'rotate', 'rotateX', 'rotateY', 'opacity'].includes(property)) {
      // Transform property
      const currentTransforms = targetEl._transforms || {};
      currentTransforms[property] = value;
      targetEl._transforms = currentTransforms;
      applyTransform(targetEl, currentTransforms);
    } else if (property === 'pathLength') {
      // SVG path animation
      targetEl.style.strokeDasharray = `${value} ${1 - value}`;
      targetEl.style.strokeDashoffset = 0;
    } else {
      // Direct CSS property
      targetEl.style[property] = value;
    }
  }
  
  destroy() {
    if (this.tracker) {
      this.tracker.destroy();
    }
  }
}

// ============================================================================
// INTERSECTION OBSERVER ANIMATIONS (for entrance effects)
// ============================================================================

class IntersectionAnimation {
  constructor(elements, options = {}) {
    // Ensure we have a valid array of elements
    if (!elements) {
      console.warn('IntersectionAnimation: No elements provided');
      return;
    }
    
    // Convert NodeList or single element to array and filter nulls
    this.elements = (Array.isArray(elements) ? elements : [elements]).filter(el => el && el.nodeType === 1);
    
    if (this.elements.length === 0) {
      console.warn('IntersectionAnimation: No valid elements to observe');
      return;
    }
    
    this.options = {
      threshold: options.threshold || 0.1,
      rootMargin: options.rootMargin || '0px',
      stagger: options.stagger || 0,
      animationClass: options.animationClass || 'revealed',
      once: options.once !== false, // Default to true
      ...options
    };
    
    if (prefersReducedMotion() && !options.ignoreReducedMotion) {
      // Show immediately if reduced motion preferred
      this.elements.forEach(el => {
        if (el) el.classList.add(this.options.animationClass);
      });
      return;
    }
    
    this.init();
  }
  
  init() {
    const observerOptions = {
      threshold: this.options.threshold,
      rootMargin: this.options.rootMargin
    };
    
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const staggerIndex = parseInt(entry.target.dataset.staggerIndex) || 0;
          const delay = this.options.stagger * staggerIndex;
          
          setTimeout(() => {
            entry.target.classList.add(this.options.animationClass);
            
            if (this.options.onReveal) {
              this.options.onReveal(entry.target);
            }
          }, delay);
          
          if (this.options.once) {
            this.observer.unobserve(entry.target);
          }
        } else if (!this.options.once) {
          entry.target.classList.remove(this.options.animationClass);
        }
      });
    }, observerOptions);
    
    // Observe all elements with stagger index
    this.elements.forEach((el, index) => {
      if (el) {
        el.dataset.staggerIndex = index;
        this.observer.observe(el);
      }
    });
  }
  
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

// ============================================================================
// BEZIER CURVE CALCULATIONS (for icon path animations)
// ============================================================================

/**
 * Calculate point on cubic bezier curve
 * @param {number} t - Progress (0-1)
 * @param {Object} p0 - Start point {x, y}
 * @param {Object} p1 - Control point 1 {x, y}
 * @param {Object} p2 - Control point 2 {x, y}
 * @param {Object} p3 - End point {x, y}
 */
function cubicBezier(t, p0, p1, p2, p3) {
  const u = 1 - t;
  const tt = t * t;
  const uu = u * u;
  const uuu = uu * u;
  const ttt = tt * t;
  
  return {
    x: uuu * p0.x + 3 * uu * t * p1.x + 3 * u * tt * p2.x + ttt * p3.x,
    y: uuu * p0.y + 3 * uu * t * p1.y + 3 * u * tt * p2.y + ttt * p3.y
  };
}

/**
 * Calculate point on quadratic bezier curve
 * @param {number} t - Progress (0-1)
 * @param {Object} p0 - Start point {x, y}
 * @param {Object} p1 - Control point {x, y}
 * @param {Object} p2 - End point {x, y}
 */
function quadraticBezier(t, p0, p1, p2) {
  const u = 1 - t;
  const tt = t * t;
  const uu = u * u;
  
  return {
    x: uu * p0.x + 2 * u * t * p1.x + tt * p2.x,
    y: uu * p0.y + 2 * u * t * p1.y + tt * p2.y
  };
}

// ============================================================================
// EXPORT API
// ============================================================================

window.ScrollAnimations = {
  // Classes
  ScrollProgressTracker,
  ScrollAnimationController,
  IntersectionAnimation,
  
  // Utility functions
  interpolate,
  clamp,
  easing,
  applyTransform,
  cubicBezier,
  quadraticBezier,
  prefersReducedMotion,
  
  // Convenience function to create scroll animation
  create: (element, config) => new ScrollAnimationController(element, config),
  
  // Convenience function for intersection animations
  onReveal: (elements, options) => new IntersectionAnimation(elements, options)
};

// Log initialization
console.log('✨ Scroll Animation System loaded');
