declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement;
  const url: string;
  export default url;
}

interface Window {
  channel: any;
  vscodeEnv: {
    appName: string;
    appRoot: string;
    uriScheme: string;
    language: string;
    clipboard: Clipboard;
    machineId: string;
    sessionId: string;
    isNewAppInstall: boolean;
    isTelemetryEnabled: boolean;
    remoteName: string | undefined;
    shell: string;
    uiKind: 1 | 2;
  };
}
