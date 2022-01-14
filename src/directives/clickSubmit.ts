/**
 * @Description: 按钮节流,只支持有disabled属性的标签，点击后提交并禁用按钮，展示加载中的状态。防止多次提交  v-clickSubmit={this.onSubmit}
 * @Author: Friends233
 */
import { DirectiveOptions } from "vue/types/umd";
let historyTextColor = ''
// 背景透明度
const opacity = '0.3'

function addLoadingStatus(el: HTMLElement & { disabled?: boolean }) {
  // 加载中的svg，可自行替换
  const loadingImg = "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMOSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAwIDAiIHhtbDpzcGFjZT0icHJlc2VydmUiPgogICAgPHBhdGggZmlsbD0iIzQwOUVGRiIgZD0iTTczLDUwYzAtMTIuNy0xMC4zLTIzLTIzLTIzUzI3LDM3LjMsMjcsNTAgTTMwLjksNTBjMC0xMC41LDguNS0xOS4xLDE5LjEtMTkuMVM2OS4xLDM5LjUsNjkuMSw1MCI+CiAgICAgIDxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgYXR0cmlidXRlVHlwZT0iWE1MIiB0eXBlPSJyb3RhdGUiIGR1cj0iMXMiIGZyb209IjAgNTAgNTAiIHRvPSIzNjAgNTAgNTAiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGVUcmFuc2Zvcm0+CiAgPC9wYXRoPgo8L3N2Zz4="

  const elWidth = el.clientWidth
  const elHeight = el.clientHeight
  historyTextColor = el.style.color
  el.style.color = `rgba(0,0,0,${opacity})`

  if (el.children?.[0]) {
    const childDom = el.children[0] as HTMLElement;
    childDom.style.opacity = opacity;
  }

  const dom = document.createElement("span");
  dom.addEventListener('click',(e) => e.stopPropagation())
  dom.id = "btn-directive-loding";
  dom.style.position = "absolute";
  dom.style.top = "50%";
  dom.style.left = "50%";
  dom.style.transform = `translate(-${elWidth / 2}px,-${elHeight / 2}px)`;
  dom.innerHTML += `<img width='${elWidth}px' height='${elHeight}px' src='${loadingImg}' />`;

  const { position } = window.getComputedStyle(el)
  if(position === 'static') {
    el.style.position = "relative";
  }
  el.appendChild(dom);
  el.disabled = true;
}

function removeLoadingStatus(el: HTMLElement & { disabled?: boolean }) {
  if (el.children?.[0]) {
    const childDom = el.children[0] as HTMLElement;
    childDom.style.opacity = "1";
  }
  el.style.color = historyTextColor

  const dom = el.querySelector("#btn-directive-loding");
  if (dom && el.contains(dom)) {
    el.removeChild(dom);
  }
  el.disabled = false;
}

const clickSubmit: DirectiveOptions = {
  bind(el: HTMLElement, binding) {
    const fn = async () => {
      try {
        addLoadingStatus(el);
        await binding.value();
      } finally {
        removeLoadingStatus(el);
      }
    };
    el.addEventListener("click", fn);
  },
};

export default clickSubmit;
