import { createEffect, Show } from "solid-js";
import { profilePresenter } from "./presenter";

export const Profile = () => {
  createEffect(() => {
    profilePresenter.loadData();
  }, null);
  return (
    <>
    <Show when={profilePresenter.data.state === 'pending'}>
      Загрузка...
    </Show>
    <Show when={profilePresenter.data.state === 'rejected'}>
      {profilePresenter.data.value}
    </Show>
    <Show when={profilePresenter.data.state === 'pending'}>
      <div class="profile">
        <div class="profile__avatar"></div>
        <div class="profile__name">John Doe</div>
      </div>
    </Show>
    </>
  );
}
