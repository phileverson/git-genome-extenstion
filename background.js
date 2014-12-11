// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


chrome.commands.onCommand.addListener(function(command) {

	  console.log('Here\'s the page URL: ' + tab.url);
  console.log('Here\'s the page title: ' + tab.title);

  console.log('onCommand event received for message: ', command);

});
