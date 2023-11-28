<template>
  <div class="clockmain">
    <div class="smallTime">{{ time.timeHour }}:{{ time.timeMinute }}:{{ time.timeSecond }}</div>
    <div class="bigTime">{{ time.timeYear }} 年 {{ time.timeMonth }} 月 {{ time.timeDate }} 日</div>
  </div>
</template>

<script setup>
//想法是写一个时钟
import { reactive, watch } from 'vue';

const time = reactive({
  timeDate: 0,
  timeMonth: 0,
  timeYear: 0,
  timeHour: 0,
  timeMinute: 0,
  timeSecond: 0
})

const upDateTime = () => {
  const date = new Date();
  time.timeDate = date.getDate();
  time.timeMonth = date.getMonth() + 1;
  time.timeYear = date.getFullYear();
  time.timeHour = format(date.getHours());
  time.timeMinute = format(date.getMinutes());
  time.timeSecond = format(date.getSeconds());
}

const format = (n) => {
  return (n < 10 ? '0' : '') + n;
}

upDateTime()

setInterval(upDateTime,10)

</script>

<style scoped>
    .clockmain{
        width: 100vw;
        height: 100vh;
        z-index: 7;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        /* test */
        background-color: var(--theme-color);
        color: var(--theme-roloc);
        user-select: none;
    }

    .smallTime {
      font-size: 16vw;
      font-weight: 600;
      font-family: Microsoft Yahei;
    }

    .bigTime {
      font-size: 3vw;
      color: var(--theme-sidebar-text-color);
    }
</style>