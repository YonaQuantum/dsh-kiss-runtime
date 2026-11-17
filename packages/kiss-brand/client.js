window.__ModuleLoader__.load({
  id: '@local/kiss-brand',
  factory(require) {
    var module = { exports: {} };
    var exports = module.exports;
    Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

    const React = require('react');
    const { jsx, jsxs } = require('react/jsx-runtime');

    const PRODUCT_NAME = 'DeepSeek Harness';
    const BRAND_NAME = 'KISS Runtime';
    const SERIF =
      '"New York", "Iowan Old Style", "Palatino Linotype", Palatino, "Book Antiqua", Baskerville, Georgia, "Times New Roman", serif';
    /* Package assets are served beside the client bundle; the route accepts
       PNGs and resolves them through the package's `./assets/*` export. */
    function assetUrl(name) {
      return new URL('plugins/@local/kiss-brand/assets/' + name, document.baseURI).href;
    }

    const CSS = [
      /* A neutral monochrome accent replaces the blue brand color. The surfaces
         keep DSH's own neutrals (no warm paper cast); only the accent turns
         monochrome, so text and chrome read as plain black and white. */
      'body{--kiss-paper:#0f1115;--kiss-paper-bright:#000;--kiss-paper-dim:#61666b;--kiss-paper-faint:#81858c;--kiss-on-paper:#fff;--kiss-selection:color-mix(in srgb,#0f1115 12%,transparent);--dsw-alias-label-primary:#0f1115!important;--dsw-alias-label-secondary:#61666b!important;--dsw-alias-label-tertiary:#81858c!important;--dsw-alias-state-business-primary:#0f1115!important;--dsw-alias-state-business-tertiary:#ebeef2!important;--dsw-alias-link:#0f1115!important;--dsw-alias-label-deep-diving:#61666b!important;--dsw-alias-label-deep-diving-shimmer:#000!important;--dsw-alias-button-info-fill:#0f1115!important;--dsw-alias-button-info-hover:#000!important;--dsw-alias-brand-primary-new-color:#0f1115!important;--dsw-alias-bg-document-selection:var(--kiss-selection)!important;--dsw-focus-ring-color:#0f1115!important;--dsw-alias-label-primary-bluish:#0f1115!important}',
      'body[data-ds-dark-theme]{--kiss-paper:#f9fafb;--kiss-paper-bright:#fff;--kiss-paper-dim:#cfd3d6;--kiss-paper-faint:#adb2b8;--kiss-on-paper:#151517;--kiss-selection:color-mix(in srgb,#f9fafb 16%,transparent);--dsw-alias-label-primary:#f9fafb!important;--dsw-alias-label-secondary:#cfd3d6!important;--dsw-alias-label-tertiary:#adb2b8!important;--dsw-alias-state-business-primary:#f9fafb!important;--dsw-alias-state-business-tertiary:#353638!important;--dsw-alias-link:#f9fafb!important;--dsw-alias-label-deep-diving:#cfd3d6!important;--dsw-alias-label-deep-diving-shimmer:#fff!important;--dsw-alias-button-info-fill:#f9fafb!important;--dsw-alias-button-info-hover:#fff!important;--dsw-alias-brand-primary-new-color:#f9fafb!important;--dsw-alias-bg-document-selection:var(--kiss-selection)!important;--dsw-focus-ring-color:#f9fafb!important;--dsw-alias-label-primary-bluish:#f9fafb!important}',
      /* Songti has no medium face on macOS, so a hair of text-stroke lifts the
         CJK strokes off the background without jumping to the Bold face. Code
         and terminal keep their own monospace stacks and stay unstroked. */
      'body{font-weight:500;-webkit-text-stroke:.25px currentColor}',
      'code,pre,kbd,samp,[class*="_mono"],[class*="_code"]{-webkit-text-stroke:0}',
      '[data-slot="conversation.composer.bar"] [class*="_primary"]{color:var(--kiss-on-paper)!important}',
      '[class*="_folderActive"]{color:var(--kiss-paper)!important}',
      '[class*="_tabActive"],[class*="_tabActive"] *{color:var(--kiss-paper)!important}',
      '[class*="_tabActive"]::after{background:var(--kiss-paper)!important}',
      '[class*="_fileMention"],[class*="_fileLink"]{color:var(--kiss-paper)!important}',
      '[data-slot="conversation.composer.bar"] [class*="_primary"]{background:var(--kiss-paper)!important}',
      '[class*="_running"]{color:var(--kiss-paper)!important}',
      '[class*="_pending"]{background:var(--kiss-paper)!important}',
      /* Drop the running whale; the observer below leaves only the elapsed time. */
      '[class*="_runningIcon"]{display:none!important}',
      /* TextShimmer paints a second, translated copy of the label for the shine
         sweep. Next to the shortened "用时 …" label it reads as a ghost, so the
         elapsed time stays plain text. */
      '[class*="_runningText"] [class*="_decoration"]{display:none!important}',
      'img.kiss-hero-icon{corner-shape:round!important;border-radius:50%!important}',
      /* The sidebar keeps its brand row, but the graphic mark seat is empty now. */
      '[data-kiss-brand] [class*="_logoRow"] [class*="_brandMark"]{display:none!important}',
      /* The hero slot renders the wordmark; its old headline and preview badge go. */
      '[data-kiss-hero] > span:nth-child(2){display:none!important}',
      '[data-kiss-hero]{gap:0!important}',
      /* Hero mode: the composer drops to the normal session position, while the
         icon + wordmark take the free space above and center there. */
      '[data-kiss-hero-stack]{flex:1 1 auto;height:100%;min-height:0}',
      '[data-kiss-hero-stack] > div:first-child{flex:1 1 auto;min-height:0}',
      '[data-kiss-hero-seat]{flex:1 1 auto;min-height:0}',
      '[data-kiss-hero-scroll]{justify-content:flex-start!important}',
    ].join('');

    /**
     * A serif lockup: roman KISS, italic Runtime. New York and Iowan Old Style
     * give the mark an editorial voice on macOS; the rest of the stack keeps
     * other platforms on a legible serif.
     */
    function Wordmark({ size = 18 }) {
      return jsxs('span', {
        style: {
          display: 'inline-flex',
          alignItems: 'baseline',
          gap: '0.24em',
          fontFamily: SERIF,
          fontSize: size + 'px',
          lineHeight: 1.1,
          whiteSpace: 'nowrap',
        },
        children: [
          jsx('span', { style: { fontWeight: 600, letterSpacing: '0.02em' }, children: 'KISS' }, 'kiss'),
          jsx('span', { style: { fontStyle: 'italic', fontWeight: 400 }, children: 'Runtime' }, 'runtime'),
        ],
      });
    }

    /** Occupies the sidebar mark seat so the fish fallback never mounts. */
    function NoMark() {
      return null;
    }

    /**
     * The hero lockup: the portrait icon centered, the serif wordmark under it,
     * and a quiet "KEEP IT SIMPLE" caption. The composer remains a sibling, so
     * marking the stack/seat/scroll ancestors lets CSS push it to the normal
     * bottom composer position while this block centers in the space above.
     */
    function HeroLockup() {
      const ref = React.useRef(null);

      React.useEffect(() => {
        const node = ref.current;
        if (node === null) return;
        const marks = [
          [node.closest('[class*="_headline"]'), 'data-kiss-hero'],
          [node.closest('[class*="_composerStack"]'), 'data-kiss-hero-stack'],
          [node.closest('[class*="_composerSeat"]'), 'data-kiss-hero-seat'],
          [node.closest('[class*="_scrollBody"]'), 'data-kiss-hero-scroll'],
        ].filter(([element]) => element !== null);

        for (const [element, attribute] of marks) element.setAttribute(attribute, '');
        return () => {
          for (const [element, attribute] of marks) element.removeAttribute(attribute);
        };
      }, []);

      return jsx('span', {
        ref,
        style: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '22px',
          padding: '8px 0',
        },
        children: [
          jsx(
            'img',
            {
              src: assetUrl('app-icon-256-circle-v3.png'),
              alt: 'KISS Runtime',
              className: 'kiss-hero-icon',
              width: 128,
              height: 128,
              style: {
                display: 'block',
                borderRadius: '50%',
                cornerShape: 'round',
                border: '1px solid color-mix(in srgb, var(--kiss-paper) 18%, transparent)',
                boxSizing: 'border-box',
              },
            },
            'icon',
          ),
          jsxs(
            'span',
            {
              style: {
                display: 'inline-flex',
                alignItems: 'baseline',
                gap: '0.22em',
                fontFamily: SERIF,
                fontSize: '36px',
                lineHeight: 1.15,
                whiteSpace: 'nowrap',
                letterSpacing: '-0.01em',
              },
              children: jsx(
                'span',
                { style: { fontStyle: 'italic', fontWeight: 400 }, children: 'Keep It Simple.' },
                'phrase',
              ),
            },
            'text',
          ),
        ],
      });
    }

    /** Rewrite the layout's fixed product title without fighting its re-renders. */
    function installDocumentTitle() {
      const rewrite = (text) => text.split(PRODUCT_NAME).join(BRAND_NAME);
      let rewriting = false;

      const sync = () => {
        if (rewriting) return;
        const current = document.title;
        const next = rewrite(current);
        if (next === current) return;
        rewriting = true;
        document.title = next;
        rewriting = false;
      };

      let titleNode = document.querySelector('title');
      const observer = new MutationObserver(sync);
      const watch = () => {
        titleNode = document.querySelector('title');
        if (titleNode !== null) {
          observer.observe(titleNode, { childList: true, characterData: true, subtree: true });
        }
      };

      sync();
      watch();

      // A router or HMR pass may swap the title element itself; re-attach then.
      const headObserver = new MutationObserver(() => {
        if (titleNode !== null && titleNode.isConnected) return;
        observer.disconnect();
        watch();
        sync();
      });
      headObserver.observe(document.head, { childList: true });

      return () => {
        observer.disconnect();
        headObserver.disconnect();
      };
    }

    /** Replace the document chrome that a slot cannot reach: tabs and PWA labels. */
    function installDocumentChrome() {
      const stopTitle = installDocumentTitle();

      const meta = document.querySelector('meta[name="apple-mobile-web-app-title"]');
      const previousMeta = meta === null ? null : meta.getAttribute('content');
      if (meta !== null) meta.setAttribute('content', BRAND_NAME);

      const icons = Array.from(document.querySelectorAll('link[rel~="icon"]')).map((link) => ({
        link,
        href: link.getAttribute('href'),
      }));
      for (const { link } of icons) link.setAttribute('href', assetUrl('app-icon-64.png'));

      const touch = document.querySelector('link[rel="apple-touch-icon"]');
      const previousTouch = touch === null ? null : touch.getAttribute('href');
      if (touch !== null) touch.setAttribute('href', assetUrl('apple-touch-icon.png'));

      document.documentElement.setAttribute('data-kiss-brand', '');

      return () => {
        stopTitle();
        if (meta !== null) {
          if (previousMeta === null) meta.removeAttribute('content');
          else meta.setAttribute('content', previousMeta);
        }
        for (const { link, href } of icons) {
          if (href === null) link.removeAttribute('href');
          else link.setAttribute('href', href);
        }
        if (touch !== null) {
          if (previousTouch === null) touch.removeAttribute('href');
          else touch.setAttribute('href', previousTouch);
        }
        document.documentElement.removeAttribute('data-kiss-brand');

        const current = document.title;
        if (current === BRAND_NAME) document.title = PRODUCT_NAME;
        else if (current.endsWith(' \u2014 ' + BRAND_NAME)) {
          document.title = current.slice(0, -BRAND_NAME.length) + PRODUCT_NAME;
        }
      };
    }

    /**
     * The running status renders its label twice: the visible layer is a text
     * node, while the shine sweep paints a translated copy from the
     * `data-shimmer-text` attribute. The stylesheet hides that copy because it
     * read as a ghost; both layers are still rewritten so the label stays
     * consistent if the decoration ever comes back. The whale icon is hidden by
     * the stylesheet, and the visually hidden live region gets neutral copy.
     */
    function installRunningStatus() {
      const rewriteValue = (raw) => {
        let next = raw
          .replace(/^深度求索中[，,]\s*用时\s*/, '用时 ')
          .replace(/^Deep diving for\s*/i, '')
          .replace(/\s*···\s*$/, '');
        if (/^深度求索中\s*$/.test(next)) next = '';
        return next;
      };

      const rewriteRun = (element) => {
        for (const node of element.querySelectorAll('[data-shimmer-text]')) {
          const raw = node.getAttribute('data-shimmer-text');
          const next = rewriteValue(raw);
          if (next !== raw) node.setAttribute('data-shimmer-text', next);
        }
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
        let node;
        while ((node = walker.nextNode())) {
          const raw = node.nodeValue;
          const next = rewriteValue(raw);
          if (next !== raw) node.nodeValue = next;
        }
      };

      const scan = () => {
        for (const element of document.querySelectorAll('[class*="_runningText"]')) rewriteRun(element);
        for (const status of document.querySelectorAll('[class*="_running"] [role="status"]')) {
          if (status.textContent.includes('深度求索中')) status.textContent = '正在生成';
        }
      };

      const observer = new MutationObserver(scan);
      observer.observe(document.body, {
        subtree: true,
        childList: true,
        characterData: true,
        attributes: true,
        attributeFilter: ['data-shimmer-text'],
      });
      scan();
      return () => observer.disconnect();
    }

    /** One owned stylesheet, removed with the plugin. */
    function installStyle() {
      const style = document.createElement('style');
      style.dataset.kissBrandCss = '';
      style.textContent = CSS;
      document.head.appendChild(style);
      return () => style.remove();
    }

    /** Required service: the UI slot registry. */
    const inject = ['slots'];

    /**
     * Fill the brand seats. `slots.inject` waits for each declaring plugin, so
     * this works whether the KISS row activates before or after the sidebar and
     * conversation shells; `cordis.patch.yml` turns the official occupants off.
     */
    function apply(ctx) {
      ctx.effect(installStyle, 'kiss-brand: brand stylesheet');
      ctx.effect(installRunningStatus, 'kiss-brand: elapsed-time-only running status');
      ctx.effect(installDocumentChrome, 'kiss-brand: page title and favicon');

      ctx.slots.inject('sidebar.brand.mark', () =>
        ctx.slots.inject('sidebar.brand.name', function* () {
          yield ctx.slots.register({ name: 'sidebar.brand.mark' }, NoMark);
          yield ctx.slots.register({ name: 'sidebar.brand.name' }, Wordmark);
        }),
      );

      ctx.slots.inject('conversation.hero.brand.mark', () =>
        ctx.slots.register({ name: 'conversation.hero.brand.mark' }, HeroLockup),
      );
    }

    exports.apply = apply;
    exports.inject = inject;
    return module.exports;
  },
});
