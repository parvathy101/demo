import '@polymer/polymer/polymer-element';
import '@polymer/paper-styles/typography';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="shared-styles">
  <template>
    <style>
    .three-line-ellipsis {
      white-space: pre-wrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      word-wrap: break-word;
    }
    .ellipsis {
      white-space: pre-wrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);

