// import cartSlice from "@/Redux-Thunk/reducers/cartSlice";

import { configureStore } from "@reduxjs/toolkit";
import { faqApi } from "../features/Faq/Faq";
import { aboutApi } from "../features/about/about";
import { aboutARCFApi } from "../features/aboutARCF/aboutARCF";
import { assistantViceChairmanApi } from "../features/assistantViceChairman/assistantViceChairman";
import { bannerApi } from "../features/banner/banner";
import { chairmanApi } from "../features/chairman/chairman";
import { contactSliderApi } from "../features/contactSlider/contactSlider";
import { currentChairmanApi } from "../features/currentChairman/currentChairman";
import { directorApi } from "../features/director/Director";
import { donationApi } from "../features/donation/donation";
import { donationCategoryDescriptionApi } from "../features/donationBannerDescription/DonationBannerDescription";
import { EventsBannerApi } from "../features/eventsBanner/eventsBanner";
import { eventsCategoryDescriptionApi } from "../features/eventsCategroyDesicription/eventsCategroyDesicription";
import { EventsDetailsApi } from "../features/eventsDetails/eventsDetails";
import { GalleryCategoryDescriptionApi } from "../features/galleryBannerDescription/galleryBannerDescription";
import { healthApi } from "../features/health/health";
import { healthBannerApi } from "../features/healthBanner/healthBanner";
import { healthCategoryDetailsApi } from "../features/healthCategoryDetails/healthCategoryDetails";
import { healthDetailsApi } from "../features/healthDetails/healthDetails";
import { imageGalleryApi } from "../features/imageGallery/imageGallery";
import { managementApi } from "../features/management/management";
import { newsBannerApi } from "../features/newsBanner/newsBanner";
import { newsCategoryDescriptionApi } from "../features/newsCategroyDesicription/newsCategroyDesicription";
import { NewsDetailsApi } from "../features/newsDetails/newsDetails";
import { projectsBannerApi } from "../features/projectBanner/projectBanner";
import { projectSubCategoryApi } from "../features/projectSubCategory/projectSubCategory";
import { ProjectSubCategoryDescriptionApi } from "../features/projectSubCategoryDescription/projectSubCategoryDescription";
import { ProjectSubCategoryHeaderApi } from "../features/projectSubCategoryHeader/projectSubCategoryHeader";
import { projectsApi } from "../features/projects/projects";
import { projectsDetailsApi } from "../features/projectsDetails/projectsDetails";
import { sliderApi } from "../features/slider/slider";
import { eventsApi } from "../features/upcomingEvents/upcomingEvents";
import { NewsApi } from "../features/upcomingNews/upcomingNews";
import { UserApi } from "../features/user/user";
import { viceChairmanApi } from "../features/viceChairman/viceChairman";
import { videoGalleryApi } from "../features/videoGallery/videoGallery";
import { VolunteerApi } from "../features/volunteer/volunteer";

const store = configureStore({
  reducer: {
    [sliderApi.reducerPath]: sliderApi.reducer,
    [faqApi.reducerPath]: faqApi.reducer,
    [aboutApi.reducerPath]: aboutApi.reducer,
    [bannerApi.reducerPath]: bannerApi.reducer,
    [aboutARCFApi.reducerPath]: aboutARCFApi.reducer,
    [chairmanApi.reducerPath]: chairmanApi.reducer,
    [currentChairmanApi.reducerPath]: currentChairmanApi.reducer,
    [viceChairmanApi.reducerPath]: viceChairmanApi.reducer,
    [assistantViceChairmanApi.reducerPath]: assistantViceChairmanApi.reducer,
    [directorApi.reducerPath]: directorApi.reducer,
    [managementApi.reducerPath]: managementApi.reducer,
    [VolunteerApi.reducerPath]: VolunteerApi.reducer,
    [newsBannerApi.reducerPath]: newsBannerApi.reducer,
    [NewsDetailsApi.reducerPath]: NewsDetailsApi.reducer,
    [NewsApi.reducerPath]: NewsApi.reducer,
    [newsCategoryDescriptionApi.reducerPath]: newsCategoryDescriptionApi.reducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
    [EventsBannerApi.reducerPath]: EventsBannerApi.reducer,
    [EventsDetailsApi.reducerPath]: EventsDetailsApi.reducer,
    [eventsCategoryDescriptionApi.reducerPath]: eventsCategoryDescriptionApi.reducer,

    [projectsApi.reducerPath]: projectsApi.reducer,
    [projectsBannerApi.reducerPath]: projectsBannerApi.reducer,
    [projectsDetailsApi.reducerPath]: projectsDetailsApi.reducer,
    [healthApi.reducerPath]: healthApi.reducer,
    [healthBannerApi.reducerPath]: healthBannerApi.reducer,
    [healthDetailsApi.reducerPath]: healthDetailsApi.reducer,
    [healthCategoryDetailsApi.reducerPath]: healthCategoryDetailsApi.reducer,
    [projectSubCategoryApi.reducerPath]: projectSubCategoryApi.reducer,
    [ProjectSubCategoryHeaderApi.reducerPath]: ProjectSubCategoryHeaderApi.reducer,
    [ProjectSubCategoryDescriptionApi.reducerPath]: ProjectSubCategoryDescriptionApi.reducer,
    [GalleryCategoryDescriptionApi.reducerPath]: GalleryCategoryDescriptionApi.reducer,
    [GalleryCategoryDescriptionApi.reducerPath]: GalleryCategoryDescriptionApi.reducer,
    [imageGalleryApi.reducerPath]: imageGalleryApi.reducer,
    [videoGalleryApi.reducerPath]: videoGalleryApi.reducer,
    [donationCategoryDescriptionApi.reducerPath]: donationCategoryDescriptionApi.reducer,
    [donationApi.reducerPath]: donationApi.reducer,
    [contactSliderApi.reducerPath]: contactSliderApi.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
  },

  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      sliderApi.middleware,
      faqApi.middleware,
      aboutApi.middleware,
      bannerApi.middleware,
      aboutARCFApi.middleware,
      chairmanApi.middleware,
      currentChairmanApi.middleware,
      viceChairmanApi.middleware,
      assistantViceChairmanApi.middleware,
      directorApi.middleware,
      newsBannerApi.middleware,
      NewsDetailsApi.middleware,
      NewsApi.middleware,
      newsCategoryDescriptionApi.middleware,
      eventsCategoryDescriptionApi.middleware,
      GalleryCategoryDescriptionApi.middleware,
      eventsApi.middleware,
      EventsBannerApi.middleware,
      EventsDetailsApi.middleware,
      managementApi.middleware,
      VolunteerApi.middleware,
      projectsApi.middleware,
      projectsBannerApi.middleware,
      projectsDetailsApi.middleware,
      healthApi.middleware,
      healthBannerApi.middleware,
      healthDetailsApi.middleware,
      healthCategoryDetailsApi.middleware,
      projectSubCategoryApi.middleware,
      ProjectSubCategoryHeaderApi.middleware,
      ProjectSubCategoryDescriptionApi.middleware,
      videoGalleryApi.middleware,
      imageGalleryApi.middleware,
      donationCategoryDescriptionApi.middleware,
      donationApi.middleware,
      contactSliderApi.middleware,
      UserApi.middleware
    ),
});

export default store;
