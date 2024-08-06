export function RunLLMWidgetScript() {
  return (
    <script
      defer
      id="runllm-widget-script"
      type="module"
      src="https://widget.runllm.com"
      runllm-server-address="https://api.runllm.com"
      runllm-assistant-id="143"
      runllm-position="BOTTOM_RIGHT"
      runllm-keyboard-shortcut="Mod+k"
      runllm-name="OpenMetadata"
      runllm-brand-logo="https://avatars.githubusercontent.com/u/86132257?s=200&v=4"
      runllm-community-type="slack"
      runllm-community-url="https://openmetadata.slack.com/join/shared_invite/zt-2muq1e0tw-igZZQLgnn9etFmWACHUdMg"
    ></script>
  );
}

export default RunLLMWidgetScript;
