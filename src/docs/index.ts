import { h, render } from "preact";
import { Menu } from "../menu.ts";
import "../getto.css";

const app = h("main", { class: "layout" }, [
  h(Page, null, null),
  h(Menu, null, null),
]);
render(app, document.body);

import { useState } from "preact/hooks";
import { html } from "htm/preact";

function Page() {
  return html`
    <article class="layout__main">
      <header class="main__header">
        <h1 class="main__title">ドキュメント</h1>
        <p class="main__breadcrumb">
          <a href="#menu">MAIN</a>
          <span class="main__breadcrumb__separator"><i class="lnir lnir-chevron-right"></i></span>
          <a href="/dist/docs/index.html"><i class="lnir lnir-question-circle"></i> ドキュメント</a>
        </p>
      </header>
      <section class="main__body container">
        <section class="box">
          <div>
            <header class="box__header">
              <h2 class="box__title">フォントとアイコン</h2>
            </header>
            <section class="box__body paragraph">
              <section class="content">
                <p>フォントとアイコンはバンドルしない</p>
                <p>各プロジェクトで選択可能</p>
                <p>最適化は以下のリソースを使用</p>
              </section>
              <dl class="form">
                <dt class="form__header">フォント</dt>
                <dd class="form__field">
                  <p>みんなの文字</p>
                </dd>
              </dl>
              <dl class="form">
                <dt class="form__header">アイコン</dt>
                <dd class="form__field">
                  <p>LineIcons</p>
                </dd>
              </dl>
            </section>
          </div>
        </section>
        <section class="box">
          <div>
            <header class="box__header">
              <h2 class="box__title">フォントサイズ</h2>
            </header>
            <section class="box__body paragraph">
              <dl class="form">
                <dt class="form__header">相対指定</dt>
                <dd class="form__field">
                  <ul>
                    <li>big / small</li>
                    <li>badge / label / notice</li>
                    <li>button / input</li>
                    <li>loading</li>
                  </ul>
                </dd>
              </dl>
              <dl class="form">
                <dt class="form__header">絶対指定</dt>
                <dd class="form__field">
                  <ul>
                    <li>main : title / footer</li>
                    <li>menu : title / brand / footer</li>
                    <li>modal : title</li>
                    <li>search : header / help</li>
                    <li>form : header / help / message</li>
                    <li>table : th</li>
                    <li>document : title / folio</li>
                    <li>login : 各構成要素</li>
                  </ul>
                </dd>
              </dl>
            </section>
          </div>
        </section>
      </section>
      <footer class="main__footer">
        <p class="main__footer__message">powered by : LineIcons / みんなの文字</p>
      </footer>
    </article>
  `;
};