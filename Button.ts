
/**
 * 自定义button类
 */
namespace ICarry {
	/**
	 * name hf
	 * data 2018/12/13 10:35
	 */
	export class Button extends eui.Button {
		public labelDisplay: eui.Label
		public iconDisplay: eui.Image

		private _scale9Grid: string = null

		/**美术字体 */
		private bit: eui.BitmapLabel

		// /**美术字体显示 */
		private _fnt_bit: string = null

		/**字体 */
		// public font: string = null


		private _font: string = null


		public constructor() {
			super()
			// this.skinName = "resource/Skins/Button.exml"
		}
		public childrenCreated(): void {
			super.childrenCreated()
			if (!this.label) {
				if (this.labelDisplay && this.labelDisplay.parent)
					this.removeChild(this.labelDisplay)
			}
			if (this.font) {
				this.bit = new eui.BitmapLabel()
				this.addChild(this.bi)
				this.bit.font = this.font
			}
			else {
				if (this.bit && this.bit.parent != null) {
					this.removeChild(this.bit)
				}
			}
			//三个事件，缩放
			this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.noHandler, this)
			this.addEventListener(egret.TouchEvent.TOUCH_END, this.noHandler, this)
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchTapHandler, this)

			//设置9宫格参数
			if (this.scale9Grid) {
				const value = this.scale9Grid.split(',')
				const rect = new egret.Rectangle(...value.map(Number))
				this.iconDisplay.width = this.width
				this.iconDisplay.height = this.height
				this.iconDisplay.scale9Grid = rect
			}

			if (this.iconDisplay) {
				// 设置图片锚点居中
				this.iconDisplay.anchorOffsetX = this.width / 2
				this.iconDisplay.anchorOffsetY = this.height / 2
				this.iconDisplay.x = this.iconDisplay.anchorOffsetX
				this.iconDisplay.y = this.iconDisplay.anchorOffsetY
				this.labelDisplay.y = this.labelDisplay.y / 2
				this.labelDisplay.x = this.labelDisplay.x / 2
				this.labelDisplay.anchorOffsetX = this.labelDisplay.width / 2
				this.labelDisplay.anchorOffsetY = this.labelDisplay.height / 2
			}
		}


		/**
		* 设置9宫格
		*/
		public set scale9Grid(value: string) {
			this._scale9Grid = value
		}


		public get scale9Grid() {
			return this._scale9Grid || null
		}



		/**
	 	* 设置美术字体文本
	 	*/
		public set font(value: string) {
			this._font = value
		}


		public get font() {
			return this._font || null
		}

		/**
		 * 设置美术字体
		 */
		public set fntBit(value: string) {
			this._fnt_bit = value

		}

		public get fntBit() {
			return this._fnt_bit || null
		}




		/**
		 * 
		 * 点击按钮，进行放大
		 */
		private touchTapHandler(evnet: egret.TouchEvent): void {
			GBO._sound.PlayEffect("button1_mp3")  //按钮播放啊声音
			if (this.iconDisplay && this.labelDisplay) {
				this.iconDisplay.scaleX = 1.1
				this.iconDisplay.scaleY = 1.1
				this.labelDisplay.scaleY = 1.1
				this.labelDisplay.scaleX = 1.1
			}
			else {
				this.scaleY = 1.1
				this.scaleX = 1.1
			}
		}

		/**
		 * 鼠标移除按钮节点，还原
		 */
		private noHandler(event: egret.TouchEvent): void {
			if (this.iconDisplay && this.labelDisplay) {
				this.iconDisplay.scaleY = 1
				this.iconDisplay.scaleX = 1
				this.labelDisplay.scaleX = 1
				this.labelDisplay.scaleY = 1
			}
			else {
				this.scaleY = 1
				this.scaleX = 1
			}
		}
	}
}
window["ICarry"] = ICarry
window["ICarry.Button"] = ICarry.Button

