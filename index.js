import { snakeToPascalCase, toSnakeCase } from "./utils";

export const mapStateToGetters = (vuexState) =>
  Object.fromEntries(
    Object.keys(vuexState).map((stateKey) => [
      stateKey,
      (state) => state[stateKey],
    ])
  );

export const mapStateToMutations = (state, mutations) => ({
  ...(() =>
    Object.fromEntries(
      Object.keys(state).map((stateKey) => [
        `SET_${toSnakeCase(stateKey).toUpperCase()}`,
        (state, payload) => (state[stateKey] = payload),
      ])
    ))(),
  ...mutations,
});

export const mapStateToActions = (state, actions) => ({
  ...(() =>
    Object.fromEntries(
      Object.keys(state).map((stateKey) => [
        `set${snakeToPascalCase(toSnakeCase(stateKey))}`,
        ({ commit, dispatch }, payload) =>
          commit(`SET_${toSnakeCase(stateKey).toUpperCase()}`, payload),
      ])
    ))(),
  ...actions,
});

export const createModule = (base) => ({
  ...base,
  namespaced: true,
  getters: mapStateToGetters(base.state, base.getters),
  mutations: mapStateToMutations(base.state, base.mutations),
  actions: mapStateToActions(base.state, base.actions),
});
