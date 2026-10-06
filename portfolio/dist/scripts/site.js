(() => {
  "use strict";

  const root = document.documentElement;
  const body = document.body;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const clamp = (value, minimum, maximum) =>
    Math.min(maximum, Math.max(minimum, value));
  const listenToPreference = (query, callback) => {
    if (query.addEventListener) query.addEventListener("change", callback);
    else query.addListener(callback);
  };
  const storage = {
    get(type, key) {
      try {
        return window[type].getItem(key);
      } catch {
        return null;
      }
    },
    set(type, key, value) {
      try {
        window[type].setItem(key, value);
      } catch {
        // The site remains usable when browser storage is unavailable.
      }
    },
  };

  function setupNavigation() {
    const dialog = document.querySelector("#navigation");
    if (!dialog || typeof dialog.showModal !== "function") return () => {};

    const panel = dialog.querySelector(".nav-panel");
    document.querySelectorAll("[data-menu-open]").forEach((button) => {
      button.setAttribute("aria-expanded", "false");
    });
    let opener;
    let closeTimer;
    let returnFocus = true;

    const finishClose = () => {
      window.clearTimeout(closeTimer);
      dialog.classList.remove("is-closing");
      body.classList.remove("menu-is-open");
      if (dialog.open) dialog.close();
    };

    const close = ({ immediate = false, restoreFocus = true } = {}) => {
      if (!dialog.open) return;
      returnFocus = restoreFocus;
      if (immediate || reducedMotion.matches) {
        finishClose();
        return;
      }
      if (dialog.classList.contains("is-closing")) return;
      dialog.classList.add("is-closing");
      closeTimer = window.setTimeout(finishClose, 500);
    };

    document.querySelectorAll("[data-menu-open]").forEach((button) => {
      button.addEventListener("click", () => {
        window.clearTimeout(closeTimer);
        dialog.classList.remove("is-closing");
        opener = button;
        returnFocus = true;
        if (!dialog.open) dialog.showModal();
        body.classList.add("menu-is-open");
        document.querySelectorAll("[data-menu-open]").forEach((control) => {
          control.setAttribute("aria-expanded", "true");
        });
      });
    });

    dialog.querySelectorAll("[data-menu-close]").forEach((button) => {
      button.addEventListener("click", () => close());
    });
    dialog.addEventListener("cancel", (event) => {
      event.preventDefault();
      close();
    });
    dialog.addEventListener("click", (event) => {
      if (panel && !panel.contains(event.target)) close();
    });
    dialog.addEventListener("close", () => {
      window.clearTimeout(closeTimer);
      dialog.classList.remove("is-closing");
      body.classList.remove("menu-is-open");
      document.querySelectorAll("[data-menu-open]").forEach((control) => {
        control.setAttribute("aria-expanded", "false");
      });
      if (returnFocus && opener?.isConnected)
        opener.focus({ preventScroll: true });
    });
    listenToPreference(reducedMotion, () => {
      if (reducedMotion.matches && dialog.classList.contains("is-closing"))
        finishClose();
    });

    return close;
  }

  const closeNavigation = setupNavigation();

  function setupCurtain() {
    const curtain = document.querySelector("#page-curtain");
    if (!curtain) return;
    const title = curtain.querySelector("[data-curtain-title]");
    const timers = new Set();
    let navigating = false;
    let pendingDestination = null;

    const later = (callback, delay) => {
      const timer = window.setTimeout(() => {
        timers.delete(timer);
        callback();
      }, delay);
      timers.add(timer);
    };
    const withoutTransition = (callback) => {
      const previous = curtain.style.transition;
      curtain.style.transition = "none";
      callback();
      // Commit the offscreen position without sweeping back across the page.
      void curtain.offsetHeight;
      if (previous) curtain.style.transition = previous;
      else curtain.style.removeProperty("transition");
    };
    const reset = () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      timers.clear();
      navigating = false;
      pendingDestination = null;
      withoutTransition(() => {
        curtain.classList.remove("is-visible", "is-leaving");
      });
      curtain.setAttribute("aria-hidden", "true");
      body.classList.remove("page-is-transitioning");
    };
    const show = (text) => {
      if (title) title.textContent = text;
      curtain.classList.remove("is-leaving");
      curtain.classList.add("is-visible");
      curtain.setAttribute("aria-hidden", "true");
    };
    const transitionDuration = () => {
      const style = window.getComputedStyle(curtain);
      const milliseconds = (value) =>
        (Number.parseFloat(value) || 0) *
        (value.trim().endsWith("ms") ? 1 : 1000);
      const durations = style.transitionDuration.split(",").map(milliseconds);
      const delays = style.transitionDelay.split(",").map(milliseconds);
      return Math.max(
        ...durations.map(
          (duration, index) => duration + delays[index % delays.length],
        ),
      );
    };
    const leave = () => {
      curtain.classList.add("is-leaving");
      later(reset, transitionDuration() + 32);
    };

    if (!reducedMotion.matches) {
      const greetingKey = "lsy-portfolio-intro-seen";
      const firstHomeVisit =
        body.dataset.page === "home" &&
        !storage.get("sessionStorage", greetingKey);
      if (firstHomeVisit) {
        storage.set("sessionStorage", greetingKey, "1");
        withoutTransition(() => show("안녕하세요"));
        later(() => show("Hello"), 240);
        later(() => show("이승연"), 480);
        later(leave, 750);
      } else {
        withoutTransition(() => show(body.dataset.title || "이승연"));
        later(leave, 200);
      }
    } else reset();

    document.addEventListener("click", (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const link = event.target.closest("a[data-transition]");
      if (
        !link ||
        link.hasAttribute("download") ||
        link.hasAttribute("data-no-transition")
      )
        return;
      if (link.target && link.target !== "_self") return;
      const destination = new URL(link.href, window.location.href);
      if (
        destination.origin !== window.location.origin ||
        destination.hash ||
        !/^https?:$/.test(destination.protocol)
      )
        return;
      if (reducedMotion.matches) return;
      event.preventDefault();
      if (navigating) return;
      reset();
      navigating = true;
      pendingDestination = destination.href;
      closeNavigation({ immediate: true, restoreFocus: false });
      body.classList.add("page-is-transitioning");
      show(
        link.dataset.transitionTitle ||
          link.dataset.title ||
          link.textContent.trim() ||
          "이승연",
      );
      later(
        () => window.location.assign(destination.href),
        transitionDuration() + 32,
      );
    });

    listenToPreference(reducedMotion, () => {
      if (!reducedMotion.matches) return;
      const destination = pendingDestination;
      reset();
      if (destination) window.location.assign(destination);
    });
    window.addEventListener("pageshow", (event) => {
      if (event.persisted) {
        reset();
        closeNavigation({ immediate: true, restoreFocus: false });
      }
    });
  }

  setupCurtain();

  function setupMagneticButtons() {
    const buttons = [...document.querySelectorAll("[data-magnetic]")];
    const reset = (button) => {
      ["--magnet-x", "--magnet-y", "--text-x", "--text-y"].forEach(
        (property) => {
          button.style.removeProperty(property);
        },
      );
    };
    buttons.forEach((button) => {
      let bounds;
      button.addEventListener("pointerenter", () => {
        bounds = button.getBoundingClientRect();
      });
      button.addEventListener("pointermove", (event) => {
        if (
          event.pointerType !== "mouse" ||
          !finePointer.matches ||
          reducedMotion.matches
        )
          return;
        bounds ||= button.getBoundingClientRect();
        const x = clamp(
          (event.clientX - bounds.left - bounds.width / 2) * 0.24,
          -24,
          24,
        );
        const y = clamp(
          (event.clientY - bounds.top - bounds.height / 2) * 0.24,
          -24,
          24,
        );
        button.style.setProperty("--magnet-x", `${x.toFixed(2)}px`);
        button.style.setProperty("--magnet-y", `${y.toFixed(2)}px`);
        button.style.setProperty("--text-x", `${(x * 0.35).toFixed(2)}px`);
        button.style.setProperty("--text-y", `${(y * 0.35).toFixed(2)}px`);
      });
      button.addEventListener("pointerleave", () => {
        bounds = null;
        reset(button);
      });
      button.addEventListener("blur", () => reset(button));
    });
    const resetAll = () => buttons.forEach(reset);
    listenToPreference(reducedMotion, resetAll);
    listenToPreference(finePointer, resetAll);
    window.addEventListener("blur", resetAll);
  }

  setupMagneticButtons();

  function setupMarquees() {
    const states = [...document.querySelectorAll("[data-marquee]")].map(
      (element) => ({
        element,
        container: element.closest(".hero") || element.parentElement || element,
        phase: 0,
        visible: false,
      }),
    );
    if (!states.length) return () => {};
    let frame = 0;
    let lastTime = null;
    let velocity = 1;
    let suspended = false;
    const render = (state) => {
      state.element.style.transform = `translate3d(${(-state.phase * 50).toFixed(5)}%, 0, 0)`;
    };
    const canPlay = () =>
      !suspended &&
      !document.hidden &&
      !reducedMotion.matches &&
      states.some((state) => state.visible);
    const stop = () => {
      window.cancelAnimationFrame(frame);
      frame = 0;
      lastTime = null;
    };
    const tick = (time) => {
      frame = 0;
      if (!canPlay()) {
        lastTime = null;
        return;
      }
      const elapsed = lastTime === null ? 0 : Math.min(time - lastTime, 100);
      lastTime = time;
      states.forEach((state) => {
        if (!state.visible) return;
        // Two identical groups make phase 0 and phase 1 visually identical.
        state.phase = (state.phase + (velocity * elapsed) / 25000 + 1) % 1;
        render(state);
      });
      frame = window.requestAnimationFrame(tick);
    };
    const syncPlayback = () => {
      if (!canPlay()) stop();
      else if (!frame) frame = window.requestAnimationFrame(tick);
    };
    const refreshVisibility = () => {
      states.forEach((state) => {
        const bounds = state.container.getBoundingClientRect();
        state.visible = bounds.bottom > 0 && bounds.top < window.innerHeight;
      });
      syncPlayback();
    };

    states.forEach((state) => {
      state.element.style.animation = "none";
      render(state);
    });
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          states.forEach((state) => {
            if (state.container === entry.target)
              state.visible = entry.isIntersecting;
          });
        });
        syncPlayback();
      });
      new Set(states.map((state) => state.container)).forEach((container) =>
        observer.observe(container),
      );
    }
    listenToPreference(reducedMotion, () => {
      if (reducedMotion.matches) {
        stop();
        states.forEach((state) => {
          state.phase = 0;
          render(state);
        });
      } else syncPlayback();
    });
    document.addEventListener("visibilitychange", syncPlayback);
    window.addEventListener("pagehide", () => {
      suspended = true;
      stop();
    });
    window.addEventListener("pageshow", () => {
      suspended = false;
      refreshVisibility();
    });
    refreshVisibility();

    return (direction) => {
      // Change velocity only; preserving phase avoids the CSS direction flip jump.
      velocity = direction === "reverse" ? -1 : 1;
      if (!("IntersectionObserver" in window)) refreshVisibility();
    };
  }

  const setMarqueeDirection = setupMarquees();

  function setupScrollMotion() {
    const reveals = [...document.querySelectorAll("[data-reveal]")];
    const parallax = [...document.querySelectorAll("[data-parallax]")];
    const curves = [...document.querySelectorAll("[data-footer-curve]")];
    const scrollMenus = [
      ...document.querySelectorAll(".menu-toggle[data-menu-open]"),
    ];
    let observer;
    let scrollFrame = 0;
    let lastScroll = window.scrollY;
    let direction = "normal";

    const showAll = () =>
      reveals.forEach((element) => element.classList.add("is-revealed"));
    if (reducedMotion.matches || !("IntersectionObserver" in window)) showAll();
    else {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-revealed");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 },
      );
      reveals.forEach((element) => observer.observe(element));
    }
    root.classList.add("motion-ready");

    const update = () => {
      scrollFrame = 0;
      const y = window.scrollY;
      const height = window.innerHeight;
      const isScrolled = y > height * 0.3;
      body.classList.toggle("is-scrolled", isScrolled);
      scrollMenus.forEach((button) => {
        button.tabIndex = isScrolled ? 0 : -1;
        button.setAttribute("aria-hidden", String(!isScrolled));
      });
      if (Math.abs(y - lastScroll) > 1)
        direction = y > lastScroll ? "normal" : "reverse";
      lastScroll = y;
      setMarqueeDirection(direction);
      parallax.forEach((element) => {
        let offset = 0;
        if (
          !reducedMotion.matches &&
          finePointer.matches &&
          window.innerWidth >= 768
        ) {
          const bounds = element.getBoundingClientRect();
          offset = clamp(
            ((height / 2 - bounds.top - bounds.height / 2) / height) * 90,
            -45,
            45,
          );
        }
        element.style.setProperty("--parallax-y", `${offset.toFixed(2)}px`);
      });
      curves.forEach((element) => {
        const footer = element.closest("footer") || element;
        const progress = clamp(
          (height - footer.getBoundingClientRect().top) / (height * 0.75),
          0,
          1,
        );
        const curveHeight = reducedMotion.matches ? 0 : 90 * (1 - progress);
        element.style.setProperty(
          "--curve-height",
          `${curveHeight.toFixed(2)}px`,
        );
      });
    };
    const requestUpdate = () => {
      if (!scrollFrame) scrollFrame = window.requestAnimationFrame(update);
    };
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    listenToPreference(finePointer, requestUpdate);
    listenToPreference(reducedMotion, () => {
      if (reducedMotion.matches) {
        observer?.disconnect();
        showAll();
      }
      requestUpdate();
    });
    document.addEventListener("focusin", (event) => {
      const element = event.target.closest("[data-reveal]");
      if (element) {
        element.classList.add("is-revealed");
        observer?.unobserve(element);
      }
    });
    update();
  }

  setupScrollMotion();

  function setupFilmPreviews() {
    const images = [
      ...new Set(
        document.querySelectorAll(
          "img[data-preview], [data-preview] img[data-motion-src]",
        ),
      ),
    ];
    const states = images.map((image) => {
      const area = image.closest(".preview-media") || image.parentElement;
      const buttons = [
        ...document.querySelectorAll("[data-preview-toggle]"),
      ].filter((button) => {
        return image.id && button.getAttribute("aria-controls") === image.id;
      });
      const still = image.dataset.stillSrc || image.getAttribute("src");
      const motion = image.dataset.motionSrc;
      const state = {
        image,
        area,
        buttons,
        playing: false,
        available: Boolean(motion),
      };
      const setPlaying = (next) => {
        const playing = Boolean(next && state.available);
        if (playing !== state.playing) image.src = playing ? motion : still;
        state.playing = playing;
        area?.classList.toggle("is-playing", playing);
        buttons.forEach((button) => {
          const label = playing
            ? button.dataset.pauseLabel || "미리보기 정지"
            : button.dataset.playLabel || "미리보기 재생";
          button.setAttribute("aria-pressed", String(playing));
          button.setAttribute("aria-label", label);
          const text = button.querySelector("[data-preview-text]");
          if (text) text.textContent = label;
        });
      };
      state.stop = () => setPlaying(false);
      area?.addEventListener("pointerenter", (event) => {
        if (
          event.pointerType === "mouse" &&
          finePointer.matches &&
          !reducedMotion.matches
        )
          setPlaying(true);
      });
      area?.addEventListener("pointerleave", () => setPlaying(false));
      buttons.forEach((button) => {
        button.addEventListener("click", () => setPlaying(!state.playing));
        button.disabled = !state.available;
      });
      image.addEventListener("error", () => {
        if (!state.playing) return;
        state.available = false;
        setPlaying(false);
        buttons.forEach((button) => {
          button.disabled = true;
          button.setAttribute("aria-label", "미리보기를 불러올 수 없습니다");
          const text = button.querySelector("[data-preview-text]");
          if (text) text.textContent = "미리보기를 불러올 수 없습니다";
        });
      });
      setPlaying(false);
      return state;
    });
    const stopAll = () => states.forEach((state) => state.stop());
    listenToPreference(reducedMotion, stopAll);
    listenToPreference(finePointer, stopAll);
    window.addEventListener("pagehide", stopAll);
    document.addEventListener("portfolio:work-change", stopAll);
  }

  setupFilmPreviews();

  function setupProjectCursor() {
    const cursor = document.querySelector("[data-project-cursor]");
    if (!cursor) return;
    const image = cursor.querySelector("img");
    const label = cursor.querySelector("[data-cursor-label]");
    const rows = document.querySelectorAll("[data-cursor-preview]");
    const cursorViewport = window.matchMedia("(min-width: 1025px)");
    let activeRow = null;
    let frame = 0;
    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;
    cursor.setAttribute("aria-hidden", "true");
    cursor.style.pointerEvents = "none";

    const render = () => {
      frame = 0;
      x += (targetX - x) * 0.2;
      y += (targetY - y) * 0.2;
      cursor.style.setProperty("--cursor-x", `${x.toFixed(2)}px`);
      cursor.style.setProperty("--cursor-y", `${y.toFixed(2)}px`);
      if (
        activeRow &&
        (Math.abs(targetX - x) > 0.1 || Math.abs(targetY - y) > 0.1)
      )
        frame = window.requestAnimationFrame(render);
    };
    const hide = () => {
      if (image && activeRow) image.src = activeRow.dataset.cursorPreview;
      activeRow = null;
      cursor.classList.remove("is-active");
      window.cancelAnimationFrame(frame);
      frame = 0;
    };
    rows.forEach((row) => {
      row.addEventListener("pointerenter", (event) => {
        if (
          event.pointerType !== "mouse" ||
          !finePointer.matches ||
          !cursorViewport.matches ||
          reducedMotion.matches
        )
          return;
        activeRow = row;
        x = targetX = event.clientX;
        y = targetY = event.clientY;
        if (image)
          image.src = row.dataset.cursorMotion || row.dataset.cursorPreview;
        if (label) label.textContent = row.dataset.cursorLabel || "View";
        cursor.classList.add("is-active");
        render();
      });
      row.addEventListener("pointermove", (event) => {
        if (activeRow !== row) return;
        targetX = event.clientX;
        targetY = event.clientY;
        if (!frame) frame = window.requestAnimationFrame(render);
      });
      row.addEventListener("pointerleave", hide);
    });
    image?.addEventListener("error", () => {
      if (
        activeRow &&
        image.getAttribute("src") !== activeRow.dataset.cursorPreview
      )
        image.src = activeRow.dataset.cursorPreview;
      else hide();
    });
    listenToPreference(reducedMotion, hide);
    listenToPreference(finePointer, hide);
    listenToPreference(cursorViewport, hide);
    window.addEventListener("blur", hide);
    window.addEventListener("scroll", hide, { passive: true });
    window.addEventListener("pagehide", hide);
    document.addEventListener("portfolio:work-change", hide);
  }

  setupProjectCursor();

  function setupWorkControls() {
    const controls = document.querySelector("[data-work-controls]");
    const results = document.querySelector("#work-results");
    if (!controls || !results) return;
    const projects = [...results.querySelectorAll("[data-category]")];
    const filters = [...controls.querySelectorAll("button[data-filter]")];
    const views = [...controls.querySelectorAll("button[data-view]")];
    const empty = document.querySelector("[data-work-empty]");
    const status = document.querySelector("[data-results-status]");
    const tableHeading = results.querySelector(".work-table-head");
    const viewKey = "lsy-portfolio-work-view";
    let resultsAnimation;
    const animateResults = (element = results) => {
      resultsAnimation?.cancel();
      if (reducedMotion.matches || typeof element.animate !== "function")
        return;
      resultsAnimation = element.animate(
        [
          { opacity: 0.35, transform: "translateY(15px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { duration: 420, easing: "cubic-bezier(.16,1,.3,1)" },
      );
    };
    listenToPreference(reducedMotion, () => {
      if (reducedMotion.matches) resultsAnimation?.cancel();
    });

    const setView = (view, persist = false) => {
      if (view !== "list" && view !== "grid") return;
      results.dataset.view = view;
      views.forEach((button) => {
        const active = button.dataset.view === view;
        button.setAttribute("aria-pressed", String(active));
        button.classList.toggle("is-active", active);
      });
      if (persist) storage.set("localStorage", viewKey, view);
      document.dispatchEvent(new CustomEvent("portfolio:work-change"));
      if (persist) animateResults();
    };
    const setFilter = (filter, animate = false) => {
      let count = 0;
      projects.forEach((project) => {
        const visible = filter === "all" || project.dataset.category === filter;
        project.hidden = !visible;
        if (visible) count += 1;
      });
      filters.forEach((button) => {
        const active = button.dataset.filter === filter;
        button.setAttribute("aria-pressed", String(active));
        button.classList.toggle("is-active", active);
      });
      if (empty) empty.hidden = count !== 0;
      if (tableHeading) tableHeading.hidden = count === 0;
      if (status)
        status.textContent = count
          ? `작품 ${count}편을 표시합니다.`
          : "아직 공개된 작품이 없습니다.";
      document.dispatchEvent(new CustomEvent("portfolio:work-change"));
      if (animate) animateResults(count === 0 && empty ? empty : results);
    };

    filters.forEach((button) => {
      button.addEventListener("click", () => {
        const fromEmptyState = Boolean(button.closest("[data-work-empty]"));
        setFilter(button.dataset.filter, true);
        if (fromEmptyState) {
          filters
            .find(
              (control) =>
                control.dataset.filter === button.dataset.filter &&
                !control.closest("[data-work-empty]"),
            )
            ?.focus();
        }
      });
    });
    views.forEach((button) =>
      button.addEventListener("click", () =>
        setView(button.dataset.view, true),
      ),
    );
    const savedView = storage.get("localStorage", viewKey);
    setView(
      savedView === "list" || savedView === "grid"
        ? savedView
        : results.dataset.view || "list",
    );
    setFilter("all");
    controls.hidden = false;
  }

  setupWorkControls();

  function setupContactDraft() {
    const form = document.querySelector("[data-contact-form]");
    if (!form) return;
    const status =
      form.querySelector("[data-form-status]") ||
      document.querySelector("[data-form-status]");
    let output =
      form.querySelector("[data-draft-output]") ||
      document.querySelector("[data-draft-output]");
    let copying = false;

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (copying || !form.reportValidity()) return;
      const values = new FormData(form);
      const value = (name) => String(values.get(name) || "").trim();
      const draft = [
        "포트폴리오 문의",
        "",
        `이름: ${value("name")}`,
        `이메일: ${value("email")}`,
        ...(value("organization")
          ? [`소속 / 브랜드: ${value("organization")}`]
          : []),
        ...(value("project") ? [`프로젝트: ${value("project")}`] : []),
        "",
        "문의 내용",
        value("message"),
      ].join("\n");
      copying = true;
      const submitter = event.submitter;
      if (submitter) submitter.disabled = true;
      if (status) status.textContent = "문의 내용을 복사하고 있습니다.";

      try {
        if (!navigator.clipboard?.writeText)
          throw new Error("Clipboard unavailable");
        await navigator.clipboard.writeText(draft);
        if (output) output.hidden = true;
        if (status)
          status.textContent =
            "문의 내용을 복사했습니다. 메일이나 메신저에 붙여넣어 보내주세요.";
      } catch {
        if (!(output instanceof HTMLTextAreaElement)) {
          output = document.createElement("textarea");
          output.dataset.draftOutput = "";
          output.setAttribute("aria-label", "복사할 문의 내용");
          form.append(output);
        }
        output.readOnly = true;
        output.value = draft;
        output.hidden = false;
        output.focus();
        output.select();
        if (status)
          status.textContent =
            "자동으로 복사하지 못했습니다. 아래 내용을 선택해 직접 복사해 주세요.";
      } finally {
        copying = false;
        if (submitter) submitter.disabled = false;
      }
    });
    form
      .querySelectorAll('button[type="submit"], input[type="submit"]')
      .forEach((button) => {
        button.disabled = false;
      });
  }

  setupContactDraft();

  function setupClock() {
    const clocks = [...document.querySelectorAll("[data-local-time]")];
    const years = [...document.querySelectorAll("[data-year]")];
    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Seoul",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
    });
    let timer;
    const update = () => {
      const now = new Date();
      clocks.forEach((element) => {
        element.textContent = `${formatter.format(now)} KST`;
        if (element.tagName === "TIME") element.dateTime = now.toISOString();
      });
      years.forEach((element) => {
        element.textContent = String(now.getFullYear());
      });
    };
    const start = () => {
      window.clearInterval(timer);
      update();
      if (clocks.length && !document.hidden)
        timer = window.setInterval(update, 1000);
    };
    document.addEventListener("visibilitychange", start);
    window.addEventListener("pagehide", () => window.clearInterval(timer));
    window.addEventListener("pageshow", start);
    start();
  }

  setupClock();
})();
