/**
 * Host half of the KISS Runtime bundle.
 *
 * The DSH Host runs as an Electron Node process rather than the Electron main
 * process: `electron` is not importable there, so the Dock/Finder icon and the
 * macOS menu-bar application name are out of reach. Everything this bundle
 * changes is browser presentation, exposed through `./client`.
 */
export function apply() {}
