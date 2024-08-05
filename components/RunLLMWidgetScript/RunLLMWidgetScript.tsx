import Script from "next/script";

function RunLLMWidgetScript() {
  return (
    <Script
      id="runllm-widget-script"
      type="module"
      src="https://widget.runllm.com"
      strategy="lazyOnload"
      data-runllm-server-address="https://api.runllm.com"
      data-runllm-assistant-id="143"
      data-runllm-position="BOTTOM_RIGHT"
      data-runllm-keyboard-shortcut="Mod+k"
      data-runllm-name="OpenMetadata"
      data-runllm-brand-logo="https://avatars.githubusercontent.com/u/86132257?s=200&v=4"
    />
  );
}

export default RunLLMWidgetScript;
