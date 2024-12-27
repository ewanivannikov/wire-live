import { profilePresenter } from './presenter';
import { ContentStatus } from '../../shared';
import { Button } from '../../shared/ui/components/Button';
import { createEffect, Show } from 'solid-js';

export const Profile = () => {
  createEffect(() => profilePresenter.state);
  const logOut = () => {
    profilePresenter.logOut();
  };

  const logIn = () => {
    profilePresenter.logIn();
  };

  return (
    <>
      <ContentStatus
        status={profilePresenter.state.status}
        error={profilePresenter.state.error}
      >
        <div class="profile">
          <div class="profile__avatar"></div>
          <div class="profile__name">{profilePresenter.state.data.name}</div>
        </div>
      </ContentStatus>
      <Show when={profilePresenter.isUnauthorized}>
        <Button onClick={logIn}>Войти</Button>
      </Show>
      <Show when={profilePresenter.state.data?.name}>
        <Button onClick={logOut}>Выйти</Button>
      </Show>
    </>
  );
};
