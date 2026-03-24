import client from './axiosClient';

export const complaintsApi = {
  /** GET /api/complaints/?status=Pending&category=Infrastructure&page=1 */
  getAll: (params = {}) =>
    client.get('/complaints/', { params }),

  /** GET /api/complaints/:id/ */
  getById: (id) =>
    client.get(`/complaints/${id}/`),

  /** POST /api/complaints/ */
  create: (data) =>
    client.post('/complaints/', data),

  /** PATCH /api/complaints/:id/ */
  update: (id, data) =>
    client.patch(`/complaints/${id}/`, data),

  /** DELETE /api/complaints/:id/ */
  remove: (id) =>
    client.delete(`/complaints/${id}/`),

  /** POST /api/complaints/:id/attachments/ — multipart */
  uploadFile: (id, file) => {
    const form = new FormData();
    form.append('file', file);
    return client.post(`/complaints/${id}/attachments/`, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  /** POST /api/complaints/:id/history/ — add audit event */
  addHistory: (id, payload) =>
    client.post(`/complaints/${id}/history/`, payload),
};