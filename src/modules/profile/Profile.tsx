import { profilePresenter } from "./presenter";
import { ContentStatus } from "../../shared";
import { createEffect } from "solid-js";

export const Profile = () => {
  createEffect(() => profilePresenter.state);
  
  return (
    <ContentStatus 
      status={profilePresenter.state.status} 
      error={profilePresenter.state.error}
    >
      <div class="profile">
        <div class="profile__avatar"></div>
        <div class="profile__name">John Doe</div>
      </div>
    </ContentStatus>
  );
}
