/**
 * console.log() utility -- production ignores 'log()' JS calls; dev invokes 'console.log()'
 */
export const log =
  window.location &&
  (window.location.hostname === 'localhost' ||
    window.location.host.match(/^(www|cat)-[a-z0-9]+\.archive\.org$/) ||
    window.location.host.match(/\.code\.archive\.org$/) ||
    window.location.host.match(/\.dev\.archive\.org$/) ||
    window.location.host.match(/^ia-petabox-/) ||
    window.location.host.match(/^local\.archive\.org/) ||
    window.location.host.match(/^internetarchive\.github\.io$/))
    ? console.log.bind(console) // convenient, no?  Stateless function
    : () => {};
