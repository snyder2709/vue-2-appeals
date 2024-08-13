import axios from "@/api/axios";

/**
 * Получение списка обращений.
 *
 * @param {Object} params - Параметры запроса.
 * @param {string} [params.search] - Поисковой запрос.
 * @param {number} [params.page_size] - Количество элементов на странице.
 * @param {number} [params.page] - Номер страницы.
 * @returns {Promise} - Промис, который разрешается в ответ от сервера.
 */
export const getAppealsList = async (params) =>
  await axios.get("/appeals/v1.0/appeals/", { params });

/**
 * Получение помещений пользователя.
 *
 * @param {Object} params - Параметры запроса.
 * @param {string} [params.search] - Поисковой запрос.
 * @returns {Promise} - Промис, который разрешается в ответ от сервера.
 */
export const getUserPremises = async (params) =>
  await axios.get("/geo/v2.0/user-premises/", { params });

/**
 * Получение квартиры пользователя.
 *
 * @param {Object} params - Параметры запроса.
 * @param {string} [params.premises_id] - ID помещения.
 * @returns {Promise} - Промис, который разрешается в ответ от сервера.
 */
export const getUserApartament = async (params) =>
  await axios.get("/geo/v1.0/apartments", { params });

/**
 * Отправка данных для добавления заявки.
 *
 * @param {Object} params - Параметры запроса.
 * @param {string} [params.premise_id] - ID помещения.
 * @param {string} [params.apartment_id] - ID квартиры.
 * @param {Object} [params.applicant] - Информация о заявителе.
 * @param {string} [params.applicant.first_name] - Имя заявителя.
 * @param {string} [params.applicant.middle_name] - Отчество заявителя.
 * @param {string} [params.applicant.last_name] - Фамилия заявителя.
 * @param {string} [params.applicant.patronymic_name] - Отчество заявителя.
 * @param {string} [params.applicant.username] - Логин заявителя.
 * @param {string} [params.description] - Описание заявки.
 * @param {string} [params.due_date] - Срок выполнения заявки.
 * @returns {Promise<Object>} - Промис, который разрешается в ответ от сервера.
 */
export const postAddAppeal = async (params) =>
  await axios.post("/appeals/v1.0/appeals/", params);

/**
 * Отправка данных для добавления заявки.
 *
 * @param {Object} params - Параметры запроса.
 * @param {string} [params.premise_id] - ID помещения.
 * @param {string} [params.apartment_id] - ID квартиры.
 * @param {Object} [params.applicant] - Информация о заявителе.
 * @param {string} [params.applicant.first_name] - Имя заявителя.
 * @param {string} [params.applicant.middle_name] - Отчество заявителя.
 * @param {string} [params.applicant.last_name] - Фамилия заявителя.
 * @param {string} [params.applicant.patronymic_name] - Отчество заявителя.
 * @param {string} [params.applicant.username] - Логин заявителя.
 * @param {string} [params.description] - Описание заявки.
 * @param {string} [params.due_date] - Срок выполнения заявки.
 * @returns {Promise<Object>} - Промис, который разрешается в ответ от сервера.
 */
export const pathAddAppeal = async (params) =>
  await axios.patch(`/appeals/v1.0/appeals/${params.appeal_id}/`, params);
