window.__ModuleLoader__.load({
  id: '@local/kiss-output',
  factory(require) {
    var module = { exports: {} };
    var exports = module.exports;

    /*
     * KISS Runtime output — a typographic layer for the transcript.
     *
     * The transcript is one column of similar-looking grey lines: assistant
     * prose, reasoning previews and tool rows all sit at the same weight, so a
     * long turn reads as a log. This layer gives the three voices distinct
     * roles instead of adding chrome:
     *
     *   - assistant prose is the article: section titles carry a hairline rule
     *   - tool calls are margin notes: smaller, mono metadata, quiet hover
     *   - reasoning is a label: one quiet word per step, full text on click
     *
     * Everything is keyed off the DOM contracts DSH publishes for the chat
     * (`data-chat-flow-kind`, `data-chat-anchor-key`, `data-chat-group-part`,
     * `data-variant`), so no React node is replaced or re-ordered.
     */
    const CSS = [
      /* ---- article: section titles ------------------------------------- */
      '[data-chat-flow-kind="assistant-step"] [class*="_markdown_"] :is(h1,h2){' +
        'font-family:inherit;font-weight:600;font-size:15px;line-height:1.55;' +
        'letter-spacing:.01em;color:var(--dsw-alias-label-primary);' +
        'margin:32px 0 12px;padding-top:16px;border-top:1px solid var(--dsw-alias-border-l2);}' +
      '[data-chat-flow-kind="assistant-step"] [class*="_markdown_"] > :is(h1,h2):first-child{' +
        'margin-top:20px;padding-top:14px;}' +
      '[data-chat-flow-kind="assistant-step"] [class*="_markdown_"] h3{' +
        'font-family:inherit;font-weight:600;font-size:14.5px;line-height:1.55;' +
        'letter-spacing:.01em;color:var(--dsw-alias-label-primary);margin:26px 0 10px;}' +
      '[data-chat-flow-kind="assistant-step"] [class*="_markdown_"] h4{' +
        'font-family:inherit;font-weight:600;font-size:13.5px;line-height:1.55;' +
        'color:var(--dsw-alias-label-secondary);margin:20px 0 8px;}',

      /* ---- margin notes: tool rows ------------------------------------- */
      /* Labels inherit the interface font, so they stay serif under KISS
         Runtime UI and sans without it. Only real paths keep a mono face. */
      '[data-chat-flow-kind="tool-call"] [data-variant]{border-radius:6px;' +
        'padding:0 6px;margin:0 -6px;transition:background-color .15s ease;}' +
      '[data-chat-flow-kind="tool-call"] [data-variant]:hover{' +
        'background:color-mix(in srgb,var(--dsw-alias-label-primary) 4.5%,transparent);}' +
      '[data-chat-flow-kind="tool-call"] [data-variant] > span [class*="_title"]{' +
        'font-size:11.5px;line-height:20px;letter-spacing:.02em;color:var(--dsw-alias-label-tertiary);}' +
      '[data-chat-flow-kind="tool-call"] [data-variant] > span [class*="_summary"]{' +
        'font-size:12px;line-height:20px;color:var(--dsw-alias-label-secondary);}' +
      '[data-chat-flow-kind="tool-call"] [data-variant] > span [class*="_sep"]{opacity:.5;}' +
      '[data-chat-flow-kind="tool-call"] [data-variant] > [class*="_leading"]{opacity:.7;transform:scale(.92);}' +
      '[data-chat-flow-kind="tool-call"] [class*="_fileLink"]{font-family:var(--ds-font-family-code);}' +
      /* ---- margin notes: reasoning preview ----------------------------- */
      '[data-chat-group-part="reasoning"] [data-variant] [class*="_title"]{' +
        'font-size:11.5px;line-height:20px;color:var(--dsw-alias-label-caption);}' +
      '[data-chat-group-part="reasoning"] [data-variant] [class*="_summary"]{' +
        'font-size:12px;line-height:20px;color:var(--dsw-alias-label-tertiary);}' +
      '[data-chat-group-part="reasoning"] [data-variant] [class*="_leading"]{opacity:.5;transform:scale(.92);}' +
      /* The raw chain of thought is a detail, not a preview: one label per
         step, full text behind the disclosure. This also stops the preview
         text from resizing the row on every streamed token. */
      '[data-chat-group-part="reasoning"] [data-variant] [class*="_summary"],' +
      '[data-chat-group-part="reasoning"] [data-variant] [class*="_separator"]{display:none;}',

      /* ---- process groups: a quiet block, not a paragraph -------------- */
      '[data-chat-anchor-key^="group:"]{margin:10px 0 16px;}' +
      '[data-chat-anchor-key^="group:"] [data-chat-flow-kind="tool-call"],' +
      '[data-chat-anchor-key^="group:"] [data-chat-group-part="reasoning"]{' +
        'padding:0.5px 0;}',

      /* ---- read_image: one thumbnail, zoom stays one click away --------- */
      /* The image body only mounts while the row is open; the controller
         opens read_image rows so the preview is visible without a click. */
      /* One row: path on the left, thumbnail pinned to the right edge. The
         body is taken out of flow so it does not add a second line; the row
         reserves 44px height and 56px of right padding for it. */
      '[data-chat-flow-kind="tool-call"] [data-tool="read_image"]{' +
        'position:relative;display:flex;align-items:center;min-height:44px;padding-right:56px;}' +
      '[data-chat-flow-kind="tool-call"] [data-tool="read_image"] [class*="_imageBody"]{' +
        'position:absolute;top:50%;right:0;transform:translateY(-50%);margin:0;display:block;}' +
      '[data-chat-flow-kind="tool-call"] [data-tool="read_image"] [class*="_imageMeta"]{display:none;}' +
      /* The gallery sizes its frame inline (240x112 for a wide shot); the
         frame is the grey plate, so both frame and image become one 44px
         square. Clicking it still opens the original-size lightbox. */
      '[data-chat-flow-kind="tool-call"] [data-tool="read_image"] [class*="_frame"]{' +
        'width:44px!important;height:44px!important;border-radius:6px!important;overflow:hidden;' +
        'padding:0!important;}' +
      '[data-chat-flow-kind="tool-call"] [data-tool="read_image"] [class*="_frame"] img{' +
        'width:100%!important;height:100%!important;object-fit:cover;}' +
      '[data-chat-flow-kind="tool-call"] [data-tool="read_image"] [class*="_frame"]:hover{' +
        'box-shadow:0 0 0 1px var(--dsw-alias-label-tertiary);}' +

      /* ---- expanded detail cards --------------------------------------- */
      '[data-chat-flow-kind="tool-call"] [class*="_terminalBody"],' +
      '[data-chat-flow-kind="tool-call"] [class*="_ioCard"]{' +
        'border-radius:9px;overflow:auto;max-height:300px;}' +
      '[data-chat-flow-kind="tool-call"] [class*="_ioSection"]{' +
        'font-family:var(--ds-font-family-code);}',

      /* ---- running status: one quiet line, not a headline ---------------- */
      '[class*="_runningText"]{font-size:11.5px!important;font-weight:400!important;' +
        'color:var(--dsw-alias-label-tertiary)!important;letter-spacing:.02em;}',

      /* ---- turn footer: shrink the accounting line ---------------------- */
      '[data-chat-flow-kind="turn-tail"],[data-chat-flow-kind="turn-process"]{' +
        'font-size:11.5px;color:var(--dsw-alias-label-tertiary);}' +
      '[data-chat-flow-kind="turn-tail"] [class*="_text"],[data-chat-flow-kind="turn-process"] [class*="_text"]{' +
        'font-weight:400;}'
    ].join('');

    /**
     * Open this Turn's shell calls and image reads by default.
     *
     * The stock row is a one-line summary; the command, its output, and the
     * image preview only mount after a click. Cursor's "debugging scene" is
     * the opposite: what you just ran is already open. We therefore click the
     * disclosure of each bash/pwsh/read_image row in the newest Turn, once per
     * call id, and remember what we opened so a row the reader closes stays
     * closed. The image preview is then styled down to a thumbnail; its own
     * "view original" lightbox is untouched.
     *
     * Only the newest Turn is touched: older Turns folded by the transcript
     * keep their compact rows, and the cap keeps a runaway Turn from mounting
     * hundreds of terminal cards at once.
     */
    /* Generic tool rows put the disclosure on the row itself; dedicated
       views (read/write/edit) wrap it in a closer that holds the attributes,
       so matching happens on the element that actually carries aria-expanded. */
    const AUTO_OPEN_VARIANTS = ['bash', 'pwsh'];
    const AUTO_OPEN_TOOLS = ['read_image'];
    const AUTO_OPEN_LIMIT = 24;
    const AUTO_OPEN_DELAY = 250;

    function installAutoExpand() {
      const opened = new Set();
      let timer = 0;

      const expand = () => {
        timer = 0;
        const items = document.querySelectorAll('[data-chat-flow-kind="tool-call"][data-chat-turn]');
        if (items.length === 0) return;

        let newest = -1;
        for (const item of items) {
          const turn = Number(item.getAttribute('data-chat-turn'));
          if (Number.isFinite(turn) && turn > newest) newest = turn;
        }

        const candidates = [];
        for (const item of items) {
          if (Number(item.getAttribute('data-chat-turn')) !== newest) continue;

          for (const row of item.querySelectorAll('[data-expandable="true"][aria-expanded="false"]')) {
            /* Generic rows carry the attributes on the row itself; dedicated
               views (read/write/edit, images) wrap it in an owner element. */
            const owner = row.closest('[data-variant], [data-tool]');
            if (owner === null) continue;

            const variant = owner.getAttribute('data-variant');
            const tool = owner.getAttribute('data-tool');
            if (!AUTO_OPEN_VARIANTS.includes(variant) && !AUTO_OPEN_TOOLS.includes(tool)) continue;

            const holder = row.closest('[data-chat-call-id]');
            const id = holder === null ? null : holder.getAttribute('data-chat-call-id');
            if (id === null || opened.has(id)) continue;

            candidates.push({ row, id });
          }
        }

        /* Newest first, then older ones, up to the per-pass cap. */
        let budget = AUTO_OPEN_LIMIT;
        for (let index = candidates.length - 1; index >= 0 && budget > 0; index -= 1) {
          const { row, id } = candidates[index];
          opened.add(id);
          budget -= 1;
          row.click();
        }
      };

      const schedule = () => {
        if (timer !== 0) return;
        timer = window.setTimeout(expand, AUTO_OPEN_DELAY);
      };

      const observer = new MutationObserver(schedule);
      observer.observe(document.body, { childList: true, subtree: true });
      schedule();
      return () => {
        observer.disconnect();
        if (timer !== 0) window.clearTimeout(timer);
      };
    }

    /** One owned stylesheet, removed with the plugin. */
    function installStyle() {
      const style = document.createElement('style');
      style.dataset.kissOutputCss = '';
      style.textContent = CSS;
      document.head.appendChild(style);
      return () => style.remove();
    }

    function apply(ctx) {
      ctx.effect(installStyle, 'kiss-output: transcript stylesheet');
      ctx.effect(installAutoExpand, 'kiss-output: open current shell calls');
    }

    exports.apply = apply;
    exports.inject = [];
    return module.exports;
  },
});
