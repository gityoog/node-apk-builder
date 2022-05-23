export default class RenderLoading {
  static symbol = "\uF666"

  private value = ''
  private ref = ''
  private dots = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
  private index = 0
  private enabled = false
  private timer: NodeJS.Timeout | null = null

  private transform() {
    if (this.enabled) {
      const dot = this.dots[this.index]
      this.value = this.ref.replace(new RegExp(RenderLoading.symbol, 'g'), dot)
      this.update()
    }
  }

  private createTimer() {
    if (!this.timer) {
      this.timer = setInterval(() => {
        this.index = (this.index + 1) % this.dots.length
        this.transform()
      }, 80)
    }
  }

  private clearTimer() {
    if (this.timer) {
      clearTimeout(this.timer)
    }
    this.timer = null
  }

  private enable() {
    if (this.enabled === false) {
      this.enabled = true
      this.createTimer()
    }
  }

  private disable() {
    if (this.enabled) {
      this.enabled = false
      this.clearTimer()
    }
    this.update()
  }

  setRef(value: string) {
    this.ref = value
    if (value.includes(RenderLoading.symbol)) {
      this.enable()
    } else {
      this.disable()
    }
  }

  private _update?: (value: string) => void
  onUpdate(callback: (value: string) => void) {
    this._update = callback
  }

  private update() {
    this._update?.(this.enabled ? this.value : this.ref)
  }

  destroy() {
    this.clearTimer()
    this._update = undefined
  }
}