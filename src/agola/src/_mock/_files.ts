import { _mock } from './_mock'
import { _tags } from './assets'

const GB = 1000000000 * 24

const FOLDERS = ['Docs', 'Projects', 'Work', 'Training', 'Sport', 'Foods']

const FILES = [
  'cover-2.jpg',
  'design-suriname-2015.mp3',
  'expertise-2015-conakry-sao-tome-and-principe-gender.mp4',
  'money-popup-crack.pdf',
  'cover-4.jpg',
  'cover-6.jpg',
  'large-news.txt',
  'nauru-6015-small-fighter-left-gender.psd',
  'tv-xs.doc',
  'gustavia-entertainment-productivity.docx',
  'vintage-bahrain-saipan.xls',
  'indonesia-quito-nancy-grace-left-glad.xlsx',
  'legislation-grain.zip',
  'large-energy-dry-philippines.rar',
  'footer-243-ecuador.iso',
  'kyrgyzstan-04795009-picabo-street-guide-style.ai',
  'india-data-large-gk-chesterton-mother.esp',
  'footer-barbados-celine-dion.ppt',
  'socio-respectively-366996.pptx',
  'socio-ahead-531437-sweden-popup.wav',
  'trinidad-samuel-morse-bring.m4v',
  'cover-12.jpg',
  'cover-18.jpg',
  'xl-david-blaine-component-tanzania-books.pdf',
]

const URLS = []

const SHARED_PERSONS = [...Array(20)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.fullName(index),
  email: _mock.email(index),
  // avatarUrl: _mock.image.avatar(index),
  permission: index % 2 ? 'view' : 'edit',
}))

export const FILE_TYPE_OPTIONS = [
  'folder',
  'txt',
  'zip',
  'audio',
  'image',
  'video',
  'word',
  'excel',
  'powerpoint',
  'pdf',
  'photoshop',
  'illustrator',
]

const shared = (index: number) =>
  (index === 0 && SHARED_PERSONS.slice(0, 5)) ||
  (index === 1 && SHARED_PERSONS.slice(5, 9)) ||
  (index === 2 && SHARED_PERSONS.slice(9, 11)) ||
  (index === 3 && SHARED_PERSONS.slice(11, 12)) ||
  []

export const _folders = FOLDERS.map((name, index) => ({
  id: `${_mock.id(index)}_folder`,
  name,
  type: 'folder',
  url: URLS[index],
  shared: shared(index),
  tags: _tags.slice(0, 5),
  size: GB / ((index + 1) * 10),
  totalFiles: (index + 1) * 100,
  createdAt: _mock.time(index),
  modifiedAt: _mock.time(index),
  isFavorited: _mock.boolean(index + 1),
}))

export const _files = FILES.map((name, index) => ({
  id: `${_mock.id(index)}_file`,
  name,
  url: URLS[index],
  shared: shared(index),
  tags: _tags.slice(0, 5),
  size: GB / ((index + 1) * 500),
  createdAt: _mock.time(index),
  modifiedAt: _mock.time(index),
  type: `${name.split('.').pop()}`,
  isFavorited: _mock.boolean(index + 1),
}))

export const _allFiles = [..._folders, ..._files]
