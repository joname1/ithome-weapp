import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Swiper, SwiperItem  } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  constructor() {
    super(...arguments)
    this.state = {
      current: 1,
      duration: 500,
      interval: 5000,
      isAutoplay: true,
      isCircular: true,
      hasIndicatorDots: true
    }
  }

  componentDidMount () { }

  render () {
    const { current, duration, interval, circular,isAutoplay,hasIndicatorDots } = this.state
    return (
      <View>
        <Swiper
          slideMult='10'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          current={current}
          duration={duration}
          interval={interval}
          circular={isCircular}
          autoplay={isAutoplay}
          indicatorDots={hasIndicatorDots}
          preMargin='20'
          className="swipers">
          <SwiperItem>
            <Image src='http://placeimg.com/640/480/nature' mode="widthFix" style="width: 100%" />
          </SwiperItem>
          <SwiperItem>
            <Image src='http://placeimg.com/640/480/arch' mode="widthFix" style="width: 100%" />
          </SwiperItem>
          <SwiperItem>
            <Image src='http://placeimg.com/640/480/tech' mode="widthFix" style="width: 100%" />
          </SwiperItem>

        </Swiper>
      </View>
    )
  }
}
