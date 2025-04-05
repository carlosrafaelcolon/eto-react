### Notes on AppWrapper (`src/eto-components/AppWrapper.tsx`)

- I updated the effect to include an empty dependency array (`[]`) and added a cleanup function with `removeEventListener` to ensure only one listener is attached and properly cleaned up on unmount.
- This prevents potential memory leaks from accumulating listeners on re-render. For example, the [AGORA site](https://agora.eto.tech) appends 8 resize listeners on initial load, which continue stacking as users switch tabs.



### **@react-spring/web Peer Dependency Conflict (No Support Yet for React 19)**

The current version of `@react-spring/web` (`9.7.5`) does not officially support React 19. This is due to a peer dependency conflict, as the library only supports React versions `^16.8.0 || ^17.0.0 || ^18.0.0`.

#### **Relevant Issues and Pull Requests**
- [React 19 Support Issue #2341](https://github.com/pmndrs/react-spring/issues/2341): Tracks the community's request for React 19 support.
- [React 19 Upgrade Pull Request #2363](https://github.com/pmndrs/react-spring/pull/2363): A PR that introduces React 19 compatibility. This PR is currently under review and awaiting approval from the maintainers.

#### **Current Workaround**
To use `@react-spring/web` with React 19, you can bypass the peer dependency checks during installation. This allows the library to be installed despite the version mismatch:

```bash
npm install @react-spring/web@9.7.5 --legacy-peer-deps
```

> **Note**: This workaround may lead to runtime issues if `@react-spring/web` is not fully compatible with React 19.

#### **Next Steps**
- Monitor the progress of [PR #2363](https://github.com/pmndrs/react-spring/pull/2363) for updates on React 19 support.
- Once the PR is merged and a new version is released, update the library to the latest version and remove the `--legacy-peer-deps` flag from the installation process.