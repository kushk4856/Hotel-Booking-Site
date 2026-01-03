/**
 * @typedef {Object} NavItem
 * @property {string} label
 * @property {string} href
 */

/**
 * @typedef {Object} SlidingNavbarProps
 * @property {NavItem[]} [items]
 * @property {number} [defaultActive]
 * @property {string} [ctaText]
 * @property {string} [ctaHref]
 * @property {(index: number, href: string) => void} [onNavigate]
 * @property {string} [className]
 */

/**
 * @typedef {'light' | 'dark' | 'system'} Theme
 */

/**
 * @typedef {Object} Cabin
 * @property {string} id
 * @property {string} name
 * @property {number} maxCapacity
 * @property {number} regularPrice
 * @property {number} discount
 * @property {string} description
 * @property {string} image
 */

/**
 * @typedef {Object} Booking
 * @property {string} id
 * @property {string} cabinId
 * @property {string} guestId
 * @property {Date} startDate
 * @property {Date} endDate
 * @property {number} numGuests
 * @property {number} totalPrice
 * @property {'unconfirmed' | 'checked-in' | 'checked-out'} status
 */

/**
 * @typedef {Object} ElectricBorderBeamProps
 * @property {React.ReactNode} children
 * @property {number} [duration]
 * @property {number} [beamLength]
 * @property {string[]} [colors]
 * @property {number} [borderRadius]
 * @property {number} [strokeWidth]
 * @property {string} [className]
 */

export {};
